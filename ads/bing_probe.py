# /// script
# requires-python = ">=3.10"
# dependencies = ["bingads"]
# ///
"""Verify Bing Ads auth and discover customer/account IDs."""
import os
from bingads.authorization import AuthorizationData, OAuthDesktopMobileAuthCodeGrant
from bingads.service_client import ServiceClient

CLIENT_ID = os.environ["BING_ADS_CLIENT_ID"]
DEV_TOKEN = os.environ["BING_ADS_DEVELOPER_TOKEN"]
REFRESH = os.environ["BING_ADS_REFRESH_TOKEN"]

auth = OAuthDesktopMobileAuthCodeGrant(
    client_id=CLIENT_ID,
    env="production",
    oauth_scope="msads.manage",
)
auth.request_oauth_tokens_by_refresh_token(REFRESH)

authorization_data = AuthorizationData(
    account_id=None,
    customer_id=None,
    developer_token=DEV_TOKEN,
    authentication=auth,
)

cms = ServiceClient(
    service="CustomerManagementService",
    version=13,
    authorization_data=authorization_data,
    environment="production",
)

user = cms.GetUser(UserId=None).User
print("OK auth. User:", user.UserName, "| UserId:", user.Id, "| CustomerId:", user.CustomerId)

accounts = cms.GetAccountsInfo(CustomerId=user.CustomerId, OnlyParentAccounts=False)
print("\nAccounts:")
ai = accounts.AccountInfo if accounts and hasattr(accounts, "AccountInfo") else []
for a in ai:
    print(f"  AccountId(aid)={a.Id}  Number={a.Number}  Name={a.Name}  Status={a.AccountLifeCycleStatus}")
print("\nCustomerId(cid) to use:", user.CustomerId)
