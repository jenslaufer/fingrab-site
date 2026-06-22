# /// script
# requires-python = ">=3.10"
# dependencies = ["bingads"]
# ///
"""Create the FinGrab Microsoft (Bing) Ads search campaign — PAUSED.

Implements ads/microsoft-ads-campaign.md (+ google-ads-campaign.md for AG1/AG2
keywords & RSAs). Structure, keywords, 3 RSAs, master negatives, EN language,
Manual CPC, EUR 4/day. Geo is left for the review step (see note at end)."""
import os
from bingads.authorization import AuthorizationData, OAuthDesktopMobileAuthCodeGrant
from bingads.service_client import ServiceClient
from suds.plugin import MessagePlugin

# Final URL for all ads: the Chrome Web Store listing (only store listing; Edge installs here too).
STORE_URL = "https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm"


class Prune(MessagePlugin):
    """suds-community 1.2.0 serializes nillable None enums (e.g. Campaign.BidStrategyScope,
    type EntityScope) as empty elements -> server rejects 'invalid enum value '''.
    Strip empty attribute-less leaf elements from the outgoing Body."""
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


CID = int(os.environ["BING_ADS_CUSTOMER_ID"])
AID = int(os.environ["BING_ADS_ACCOUNT_ID"])
auth = OAuthDesktopMobileAuthCodeGrant(client_id=os.environ["BING_ADS_CLIENT_ID"], env="production", oauth_scope="msads.manage")
auth.request_oauth_tokens_by_refresh_token(os.environ["BING_ADS_REFRESH_TOKEN"])
authz = AuthorizationData(account_id=AID, customer_id=CID, developer_token=os.environ["BING_ADS_DEVELOPER_TOKEN"], authentication=auth)
S = ServiceClient(service="CampaignManagementService", version=13, authorization_data=authz, environment="production")
S.soap_client.options.plugins.append(Prune())
f = S.factory


def clean(o):
    """suds factory fills optional fields with '' which breaks enum deserialization. Null them."""
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


def strs(items):
    return {"string": list(items)}


def show_errors(label, res):
    pe = getattr(res, "PartialErrors", None)
    errs = getattr(pe, "BatchError", None) if pe else None
    if errs:
        for e in errs:
            print(f"  ! {label} error idx={e.Index}: {e.Code} {e.ErrorCode} - {e.Message}")
    npe = getattr(res, "NestedPartialErrors", None)
    nests = getattr(npe, "BatchErrorCollection", None) if npe else None
    if nests:
        for n in nests:
            for e in (getattr(n, "BatchError", None) or []):
                print(f"  ! {label} nested idx={n.Index}: {e.Code} {e.ErrorCode} - {e.Message}")


CAMP_NAME = "FinGrab | Search | MS | EN-Finance"

# ---- Cleanup: delete any existing campaign with the same name (re-runnable) ----
existing = S.GetCampaignsByAccountId(AccountId=AID, CampaignType="Search")
dups = [c.Id for c in (getattr(existing, "Campaign", []) or []) if c.Name == CAMP_NAME]
if dups:
    S.DeleteCampaigns(AccountId=AID, CampaignIds={"long": dups})
    print("Deleted existing campaign(s) with same name:", dups)

# ---- Campaign (Paused) ----
c = f.create("Campaign")
c.Name = CAMP_NAME
c.CampaignType = "Search"
c.BudgetType = "DailyBudgetStandard"
c.DailyBudget = 4.0
c.TimeZone = "AmsterdamBerlinBernRomeStockholmVienna"
c.Status = "Paused"
c.Languages = strs(["English"])
bs = f.create("ManualCpcBiddingScheme")
bs.Type = "ManualCpc"
c.BiddingScheme = bs
res = S.AddCampaigns(AccountId=AID, Campaigns=arr("ArrayOfCampaign", [c], "Campaign"))
show_errors("campaign", res)
campaign_id = res.CampaignIds.long[0]
print("Campaign created (PAUSED):", campaign_id)


def add_ad_group(name, bid):
    ag = f.create("AdGroup")
    ag.Name = name
    ag.Status = "Paused"
    cpc = f.create("Bid"); cpc.Amount = bid
    ag.CpcBid = cpc
    r = S.AddAdGroups(CampaignId=campaign_id, AdGroups=arr("ArrayOfAdGroup", [ag], "AdGroup"), ReturnInheritedBidStrategyTypes=False)
    show_errors(f"adgroup {name}", r)
    agid = r.AdGroupIds.long[0]
    print(f"  AdGroup '{name}':", agid)
    return agid


def add_keywords(agid, exact, phrase):
    kws = []
    for t in exact:
        k = f.create("Keyword"); k.Text = t; k.MatchType = "Exact"; kws.append(k)
    for t in phrase:
        k = f.create("Keyword"); k.Text = t; k.MatchType = "Phrase"; kws.append(k)
    r = S.AddKeywords(AdGroupId=agid, Keywords=arr("ArrayOfKeyword", kws, "Keyword"), ReturnInheritedBidStrategyTypes=False)
    show_errors("keywords", r)
    print(f"    keywords: {len(exact)} exact + {len(phrase)} phrase")


def add_rsa(agid, headlines, descriptions, pinned_headline, path1, path2, final_url=STORE_URL):
    ad = f.create("ResponsiveSearchAd")
    ad.FinalUrls = strs([final_url])
    ad.Path1 = path1
    ad.Path2 = path2
    hl = f.create("ArrayOfAssetLink")
    for h in headlines:
        al = f.create("AssetLink"); ta = f.create("TextAsset"); ta.Text = h; al.Asset = ta
        if h == pinned_headline:
            al.PinnedField = "Headline1"
        hl.AssetLink.append(al)
    ad.Headlines = hl
    dl = f.create("ArrayOfAssetLink")
    for d in descriptions:
        al = f.create("AssetLink"); ta = f.create("TextAsset"); ta.Text = d; al.Asset = ta
        dl.AssetLink.append(al)
    ad.Descriptions = dl
    r = S.AddAds(AdGroupId=agid, Ads=arr("ArrayOfAd", [ad], "Ad"))
    show_errors("rsa", r)
    print(f"    RSA: {len(headlines)} headlines / {len(descriptions)} descriptions")


# ---- Ad Group 1: Yahoo Finance Export ----
ag1 = add_ad_group("Yahoo Finance Export", 0.25)
add_keywords(ag1,
    ["yahoo finance export", "export yahoo finance data", "yahoo finance csv download", "download yahoo finance data"],
    ["yahoo finance to excel", "export yahoo finance to csv", "yahoo finance data download",
     "yahoo finance historical data download", "download stock data from yahoo finance"])
add_rsa(ag1,
    ["Export Yahoo Finance Data", "Yahoo Finance To CSV", "Yahoo Finance To Excel", "One-Click Data Export",
     "Download In Seconds", "No Signup, No API Keys", "Setup In Under 2 Minutes", "Raw Data For Excel",
     "FinGrab Chrome Extension", "Grab Financial Data Now", "Yahoo Finance Exporter", "CSV Ready For Analysis",
     "Free To Install", "Historical Prices To CSV", "Skip The Copy-Paste"],
    ["Export raw data from Yahoo Finance in one click. CSV ready for Excel & Sheets.",
     "No signup, no API keys. Install the Chrome extension and export in 2 minutes.",
     "Historical prices, statements, dividends. Download straight to a spreadsheet.",
     "Built for investors and analysts. Get the raw data, analyze on your own terms."],
    "FinGrab Chrome Extension", "yahoo-finance", "export")

# ---- Ad Group 2: Stock Data -> Excel ----
ag2 = add_ad_group("Stock Data to Excel", 0.25)
add_keywords(ag2,
    ["export stock data to excel", "download stock data excel", "stock data to spreadsheet"],
    ["export stock prices to excel", "historical stock data csv", "download stock prices spreadsheet",
     "stock data export tool", "ohlcv data download", "dividend history export"])
add_rsa(ag2,
    ["Export Stock Data To Excel", "Stock Prices To Spreadsheet", "One-Click CSV Export", "Download OHLCV Data",
     "Raw Data For Your Models", "Skip Manual Copy-Paste", "From Browser To Excel", "No Signup Required",
     "Dividend History To CSV", "For Analysts & Traders", "Setup In Under 2 Minutes", "FinGrab Chrome Extension",
     "Historical Stock Data", "Free To Install", "Build Your Portfolio Model"],
    ["Export stock prices and OHLCV to CSV. Open in Excel, Sheets or LibreOffice.",
     "Stop copying data by hand. One click pulls raw data into your spreadsheet.",
     "Historical prices, dividends and statements, ready for pivot tables & charts.",
     "Free Chrome extension. No signup, no API keys, no setup headache. Under 2 min."],
    "FinGrab Chrome Extension", "stock-data", "excel")

# ---- Ad Group 3: Chrome / Edge Extension (Edge-adapted) ----
ag3 = add_ad_group("Chrome Edge Extension", 0.25)
add_keywords(ag3,
    ["financial data chrome extension", "yahoo finance chrome extension", "stock data chrome extension",
     "edge extension stock data"],
    ["chrome extension export financial data", "yahoo finance exporter extension", "finance data scraper chrome",
     "chrome extension stock data", "yahoo finance edge extension", "finance data extension edge"])
add_rsa(ag3,
    ["Works In Edge & Chrome", "Yahoo Finance Extension", "Export Data In One Click", "No Signup, No API Keys",
     "Finance Data Browser Tool", "Stock Data Extension", "Raw Data For Excel", "Setup In Under 2 Minutes",
     "CSV Export For Finance", "Free To Install", "Grab Yahoo Finance Data", "One-Click CSV Download",
     "FinGrab For Your Browser", "Local & Private By Design", "Built For Analysts"],
    ["Export Yahoo Finance data to CSV in one click. Works in Edge and Chrome.",
     "No signup, no API keys. Install in under 2 minutes and export instantly.",
     "Runs locally in your browser. Your data is never sent to outside servers.",
     "Historical prices, dividends and statements, ready for Excel and Sheets."],
    "FinGrab For Your Browser", "extension", "yahoo-finance")

# ---- Master negative keywords (campaign-level, Phrase) — non-fatal ----
NEGS = ["free stock screener", "stock trading platform", "yahoo finance login", "yahoo mail",
        "stock broker", "brokerage account", "buy stocks", "trading app", "robinhood", "etrade",
        "fidelity", "schwab", "day trading course", "stock tips", "penny stocks", "jobs", "salary",
        "career", "reddit", "youtube", "tutorial", "how to", "what is", "free api", "python api",
        "yfinance", "api key", "crypto wallet", "forex signals"]
ent = f.create("EntityNegativeKeyword")
ent.EntityId = campaign_id
ent.EntityType = "Campaign"
negs = f.create("ArrayOfNegativeKeyword")
for t in NEGS:
    nk = f.create("NegativeKeyword"); nk.Text = t; nk.MatchType = "Phrase"; nk.Type = "NegativeKeyword"
    negs.NegativeKeyword.append(nk)
ent.NegativeKeywords = negs
arrent = f.create("ArrayOfEntityNegativeKeyword")
arrent.EntityNegativeKeyword.append(ent)
res = S.AddNegativeKeywordsToEntities(EntityNegativeKeywords=arrent)
show_errors("negatives", res)
print("Negative keywords added:", len(NEGS))

print("\nDONE. Campaign", campaign_id, "is PAUSED. Review in the Microsoft Advertising UI, then enable.")
