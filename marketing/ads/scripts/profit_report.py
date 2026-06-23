# /// script
# requires-python = ">=3.10"
# dependencies = ["bingads", "stripe"]
# ///
"""Weekly FinGrab profitability report: Bing Ads spend vs Stripe new subscriptions.

Usage: source the env files, then `uv run profit_report.py [days]` (default 7).
  set -a; source ~/.secrets/bingads.env; source ~/.secrets/stripe.env; set +a
  uv run profit_report.py 7

Chrome Web Store installs have no public API; read them from the CWS Developer
Dashboard and plug into the funnel by hand. CAC here = spend / NEW paid subs.
"""
import io
import os
import sys
import time
import urllib.request
import zipfile

from bingads.authorization import AuthorizationData, OAuthDesktopMobileAuthCodeGrant
from bingads.service_client import ServiceClient
from suds.plugin import MessagePlugin

import stripe

DAYS = int(sys.argv[1]) if len(sys.argv) > 1 else 7
CAMP_NAME = "FinGrab | Search | MS | EN-Finance"
ASSUMED_LTV_EUR = 60.0  # $9/mo, ~8mo retention, minus Stripe fees — adjust as real data arrives


class Prune(MessagePlugin):
    def marshalled(self, ctx):
        b = ctx.envelope.getChild("Body")
        if b is not None:
            self._p(b)

    def _p(self, el):
        for ch in list(el.getChildren()):
            self._p(ch)
        if not el.getChildren() and (el.getText() in (None, "")) and not el.attributes:
            el.detach()


def bing_spend():
    AID = int(os.environ["BING_ADS_ACCOUNT_ID"])
    auth = OAuthDesktopMobileAuthCodeGrant(client_id=os.environ["BING_ADS_CLIENT_ID"], env="production", oauth_scope="msads.manage")
    auth.request_oauth_tokens_by_refresh_token(os.environ["BING_ADS_REFRESH_TOKEN"])
    authz = AuthorizationData(account_id=AID, customer_id=int(os.environ["BING_ADS_CUSTOMER_ID"]),
                              developer_token=os.environ["BING_ADS_DEVELOPER_TOKEN"], authentication=auth)
    R = ServiceClient(service="ReportingService", version=13, authorization_data=authz, environment="production")
    R.soap_client.options.plugins.append(Prune())
    f = R.factory

    req = f.create("CampaignPerformanceReportRequest")
    req.Format = "Csv"
    req.ReturnOnlyCompleteData = False
    req.Aggregation = "Summary"
    req.ExcludeColumnHeaders = False
    req.ExcludeReportHeader = True
    req.ExcludeReportFooter = True
    scope = f.create("AccountThroughCampaignReportScope")
    scope.AccountIds = {"long": [AID]}
    req.Scope = scope
    cols = f.create("ArrayOfCampaignPerformanceReportColumn")
    cols.CampaignPerformanceReportColumn.extend(["CampaignName", "Spend", "Clicks", "Impressions", "AverageCpc", "Ctr"])
    req.Columns = cols
    t = f.create("ReportTime")
    t.PredefinedTime = {7: "LastSevenDays", 30: "LastThirtyDays"}.get(DAYS, "LastSevenDays")
    req.Time = t

    rid = R.SubmitGenerateReport(ReportRequest=req)
    for _ in range(60):
        time.sleep(3)
        st = R.PollGenerateReport(ReportRequestId=rid)
        if st.Status == "Success":
            url = st.ReportDownloadUrl
            break
        if st.Status == "Error":
            raise RuntimeError("Bing report generation failed")
    else:
        raise TimeoutError("Bing report timed out")
    if not url:
        return {"spend": 0.0, "clicks": 0, "impressions": 0, "note": "no data (new campaign)"}

    data = urllib.request.urlopen(url).read()
    z = zipfile.ZipFile(io.BytesIO(data))
    csv = z.read(z.namelist()[0]).decode("utf-8-sig")
    rows = [r for r in csv.splitlines() if r.strip()]
    header = rows[0].split(",")
    idx = {h.strip('"'): i for i, h in enumerate(header)}
    out = {"spend": 0.0, "clicks": 0, "impressions": 0}
    for r in rows[1:]:
        c = [x.strip('"') for x in r.split(",")]
        if len(c) <= idx.get("CampaignName", 0):
            continue
        if c[idx["CampaignName"]] == CAMP_NAME:
            out["spend"] = float(c[idx["Spend"]] or 0)
            out["clicks"] = int(float(c[idx["Clicks"]] or 0))
            out["impressions"] = int(float(c[idx["Impressions"]] or 0))
    return out


def stripe_subs():
    stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
    since = int(time.time()) - DAYS * 86400
    new = list(stripe.Subscription.list(created={"gte": since}, status="all", limit=100).auto_paging_iter())
    new_paid = [s for s in new if s.status in ("active", "trialing")]
    active = list(stripe.Subscription.list(status="active", limit=100).auto_paging_iter())
    return {"new": len(new_paid), "active": len(active)}


b = bing_spend()
s = stripe_subs()
spend = b["spend"]
new = s["new"]

print(f"=== FinGrab profitability — last {DAYS} days ===")
print(f"Bing Ads   : spend €{spend:.2f} | {b['clicks']} clicks | {b['impressions']} impr"
      + (f" | {b['note']}" if b.get("note") else ""))
print(f"Stripe     : {new} new paid sub(s) | {s['active']} active total")
if spend <= 0:
    print("CAC        : n/a — no spend yet (campaign just launched). Re-run after a few days.")
elif new > 0:
    cac = spend / new
    verdict = "PROFITABLE" if cac < ASSUMED_LTV_EUR else "LOSS"
    print(f"CAC        : €{cac:.2f} per new sub  (assumed LTV €{ASSUMED_LTV_EUR:.0f} -> {verdict}, ratio {ASSUMED_LTV_EUR/cac:.1f}:1)")
else:
    print(f"CAC        : n/a — €{spend:.2f} spent, 0 new subs yet. Break-even needs 1 sub per €{ASSUMED_LTV_EUR:.0f} spend.")
print("\nManual: cross-check Chrome Web Store Dashboard installs (no public API) to get install- and free->paid rates.")
