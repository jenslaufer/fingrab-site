# /// script
# requires-python = ">=3.10"
# dependencies = ["bingads"]
# ///
"""Pre-flight: account currency/timezone + existing campaigns."""
import os
from bingads.authorization import AuthorizationData, OAuthDesktopMobileAuthCodeGrant
from bingads.service_client import ServiceClient

CID = int(os.environ["BING_ADS_CUSTOMER_ID"])
AID = int(os.environ["BING_ADS_ACCOUNT_ID"])
auth = OAuthDesktopMobileAuthCodeGrant(client_id=os.environ["BING_ADS_CLIENT_ID"], env="production", oauth_scope="msads.manage")
auth.request_oauth_tokens_by_refresh_token(os.environ["BING_ADS_REFRESH_TOKEN"])
authz = AuthorizationData(account_id=AID, customer_id=CID, developer_token=os.environ["BING_ADS_DEVELOPER_TOKEN"], authentication=auth)

cms = ServiceClient(service="CustomerManagementService", version=13, authorization_data=authz, environment="production")
acct = cms.GetAccount(AccountId=AID)
print("Account:", acct.Name, "| Currency:", acct.CurrencyCode, "| TimeZone:", acct.TimeZone, "| Status:", acct.AccountLifeCycleStatus)

camp = ServiceClient(service="CampaignManagementService", version=13, authorization_data=authz, environment="production")
res = camp.GetCampaignsByAccountId(AccountId=AID, CampaignType="Search")
existing = res.Campaign if res and hasattr(res, "Campaign") else []
print("Existing Search campaigns:", [c.Name for c in existing] or "(none)")
