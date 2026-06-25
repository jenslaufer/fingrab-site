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
APITEST_AG = "API Replacement"  # learning-test ad group: does the "API replacement / no-code" message draw clicks?
ASSUMED_LTV_EUR = 60.0  # $9/mo, ~8mo retention, minus Stripe fees — adjust as real data arrives
PREDEF_TIME = {7: "LastSevenDays", 30: "LastThirtyDays"}.get(DAYS, "LastSevenDays")


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


def bing_client():
    AID = int(os.environ["BING_ADS_ACCOUNT_ID"])
    auth = OAuthDesktopMobileAuthCodeGrant(client_id=os.environ["BING_ADS_CLIENT_ID"], env="production", oauth_scope="msads.manage")
    auth.request_oauth_tokens_by_refresh_token(os.environ["BING_ADS_REFRESH_TOKEN"])
    authz = AuthorizationData(account_id=AID, customer_id=int(os.environ["BING_ADS_CUSTOMER_ID"]),
                              developer_token=os.environ["BING_ADS_DEVELOPER_TOKEN"], authentication=auth)
    R = ServiceClient(service="ReportingService", version=13, authorization_data=authz, environment="production")
    R.soap_client.options.plugins.append(Prune())
    return R, R.factory, AID


def run_report(R, req):
    """Submit, poll, download a Bing report. Returns a list of row dicts (column -> value)."""
    rid = R.SubmitGenerateReport(ReportRequest=req)
    url = None
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
        return []
    data = urllib.request.urlopen(url).read()
    z = zipfile.ZipFile(io.BytesIO(data))
    csv = z.read(z.namelist()[0]).decode("utf-8-sig")
    rows = [r for r in csv.splitlines() if r.strip()]
    if not rows:
        return []
    header = [h.strip('"') for h in rows[0].split(",")]
    out = []
    for r in rows[1:]:
        c = [x.strip('"') for x in r.split(",")]
        out.append({h: (c[i] if i < len(c) else "") for i, h in enumerate(header)})
    return out


def bing_spend():
    R, f, AID = bing_client()
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
    t.PredefinedTime = PREDEF_TIME
    req.Time = t

    rows = run_report(R, req)
    out = {"spend": 0.0, "clicks": 0, "impressions": 0}
    if not rows:
        out["note"] = "no data (new campaign)"
        return out
    for c in rows:
        if c.get("CampaignName") == CAMP_NAME:
            out["spend"] = float(c.get("Spend") or 0)
            out["clicks"] = int(float(c.get("Clicks") or 0))
            out["impressions"] = int(float(c.get("Impressions") or 0))
    return out


def bing_adgroup(name):
    """Ad-group-level performance for one ad group (the API-replacement learning test)."""
    R, f, AID = bing_client()
    req = f.create("AdGroupPerformanceReportRequest")
    req.Format = "Csv"
    req.ReturnOnlyCompleteData = False
    req.Aggregation = "Summary"
    req.ExcludeColumnHeaders = False
    req.ExcludeReportHeader = True
    req.ExcludeReportFooter = True
    scope = f.create("AccountThroughAdGroupReportScope")
    scope.AccountIds = {"long": [AID]}
    req.Scope = scope
    cols = f.create("ArrayOfAdGroupPerformanceReportColumn")
    cols.AdGroupPerformanceReportColumn.extend(["AdGroupName", "Spend", "Clicks", "Impressions", "AverageCpc", "Ctr"])
    req.Columns = cols
    t = f.create("ReportTime")
    t.PredefinedTime = PREDEF_TIME
    req.Time = t

    for c in run_report(R, req):
        if c.get("AdGroupName") == name:
            return {"spend": float(c.get("Spend") or 0), "clicks": int(float(c.get("Clicks") or 0)),
                    "impressions": int(float(c.get("Impressions") or 0)), "ctr": c.get("Ctr", "")}
    return None


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

# --- API-replacement repositioning test (ad-group level) ---
try:
    ag = bing_adgroup(APITEST_AG)
except Exception as e:
    ag = None
    print(f"\n{APITEST_AG:12}: report error ({str(e)[:70]})")
if ag is not None:
    msg = "message draws clicks" if ag["clicks"] > 0 else "no clicks yet — message not resonating (or too little volume)"
    print(f"\n{APITEST_AG} test: €{ag['spend']:.2f} | {ag['impressions']} impr | {ag['clicks']} clicks | CTR {ag['ctr']}")
    print(f"  -> {msg}. Tests the 'Yahoo Finance API replacement / no-code' angle (Bing volume is thin).")
else:
    print(f"\n{APITEST_AG} test: no rows yet (ad group may need more time to deliver).")

print("\nManual: cross-check Chrome Web Store Dashboard installs (no public API) to get install- and free->paid rates.")
