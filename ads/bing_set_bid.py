# /// script
# requires-python = ">=3.10"
# dependencies = ["bingads"]
# ///
"""Set the CpcBid on all ad groups of the FinGrab Microsoft (Bing) Ads campaign.

Usage: python bing_set_bid.py [AMOUNT]   (AMOUNT in account currency, default 0.30)
Re-runnable. Mirrors auth + suds-pruning from bing_resume.py."""
import os
import sys
from bingads.authorization import AuthorizationData, OAuthDesktopMobileAuthCodeGrant
from bingads.service_client import ServiceClient
from suds.plugin import MessagePlugin


class Prune(MessagePlugin):
    """Strip empty attribute-less leaf elements so nillable None enums don't get
    serialized as empty elements (server rejects 'invalid enum value ''')."""
    def marshalled(self, context):
        body = context.envelope.getChild("Body")
        if body is not None:
            self._prune(body)

    def _prune(self, el):
        for ch in list(el.getChildren()):
            self._prune(ch)
        if not el.getChildren():
            t = el.getText()
            if (t is None or t == "") and not el.attributes:
                el.detach()


AMOUNT = float(sys.argv[1]) if len(sys.argv) > 1 else 0.30

CID = int(os.environ["BING_ADS_CUSTOMER_ID"])
AID = int(os.environ["BING_ADS_ACCOUNT_ID"])
auth = OAuthDesktopMobileAuthCodeGrant(client_id=os.environ["BING_ADS_CLIENT_ID"], env="production", oauth_scope="msads.manage")
auth.request_oauth_tokens_by_refresh_token(os.environ["BING_ADS_REFRESH_TOKEN"])
authz = AuthorizationData(account_id=AID, customer_id=CID, developer_token=os.environ["BING_ADS_DEVELOPER_TOKEN"], authentication=auth)
S = ServiceClient(service="CampaignManagementService", version=13, authorization_data=authz, environment="production")
S.soap_client.options.plugins.append(Prune())
f = S.factory


def clean(o):
    if hasattr(o, "__keylist__"):
        for k in o.__keylist__:
            v = getattr(o, k)
            if v == "":
                setattr(o, k, None)
            else:
                clean(v)
    elif isinstance(o, (list, tuple)):
        for x in o:
            clean(x)
    return o


def arr(type_name, items, field):
    a = f.create(type_name)
    getattr(a, field).extend(clean(i) for i in items)
    return a


def show_errors(label, res):
    pe = getattr(res, "PartialErrors", None)
    errs = getattr(pe, "BatchError", None) if pe else None
    if errs:
        for e in errs:
            print(f"  ! {label} error idx={e.Index}: {e.Code} {e.ErrorCode} - {e.Message}")


CAMP_NAME = "FinGrab | Search | MS | EN-Finance"

existing = S.GetCampaignsByAccountId(AccountId=AID, CampaignType="Search")
camps = [c for c in (getattr(existing, "Campaign", []) or []) if c.Name == CAMP_NAME]
if not camps:
    raise SystemExit(f"No campaign named {CAMP_NAME!r} found.")
campaign_id = camps[0].Id
print(f"Campaign: {CAMP_NAME} id={campaign_id}")

ags = getattr(S.GetAdGroupsByCampaignId(CampaignId=campaign_id), "AdGroup", []) or []
updates = []
for ag in ags:
    before = getattr(getattr(ag, "CpcBid", None), "Amount", None)
    u = f.create("AdGroup")
    u.Id = ag.Id
    cpc = f.create("Bid"); cpc.Amount = AMOUNT
    u.CpcBid = cpc
    updates.append(u)
    print(f"  AdGroup '{ag.Name}' id={ag.Id} CpcBid {before} -> {AMOUNT}")
if updates:
    r = S.UpdateAdGroups(CampaignId=campaign_id, AdGroups=arr("ArrayOfAdGroup", updates, "AdGroup"))
    show_errors("adgroups", r)

# ---- Verify ----
vags = getattr(S.GetAdGroupsByCampaignId(CampaignId=campaign_id), "AdGroup", []) or []
print("\nVERIFY ad group CpcBids: " +
      ", ".join(f"{a.Name}={getattr(getattr(a, 'CpcBid', None), 'Amount', None)}" for a in vags))
