# FinGrab — Google Ads Search Campaign (Launch-Ready)

Built on `google-ads-copy.md`. Char counts verified; all headlines ≤30, descriptions ≤90.

> **Product facts that constrain copy** (from the live site, do not contradict):
> - Free to install. Free tier = basic exports; premium for power users. **Do not claim "100% free forever"** — say "Free to install" / "Free download".
> - Native export is **CSV** (opens in Excel, Google Sheets, LibreOffice, Numbers). Don't promise a native `.xlsx` writer.
> - Source is **finance.yahoo.com** stock / ETF / index pages.
> - No signup, no API keys, local processing, setup < 2 min.
> - Data: historical OHLCV, financial statements, key stats, dividend history, multiple time ranges.

---

## Strategy

- **Goal:** Chrome Web Store installs (lead-gen style funnel; proxy conversion = outbound click to store — see Tracking).
- **Platform:** Google Ads Search (companion Microsoft campaign in `microsoft-ads-campaign.md`).
- **Budget:** €20/day launch (raised from the old €10–20 to give Smart Bidding enough signal). 2-week learn phase, then re-tier.
- **Bidding:** Maximize Clicks (manual CPC cap) → Maximize Conversions → tCPA. Rationale below.
- **Geo:** US, UK, CA, AU, IE (English finance markets). Germany dropped vs. baseline — English ads convert poorly to DE searchers; run DE separately later if warranted.
- **Networks:** Search only. Search Partners OFF at launch. Display Network OFF.

---

## Campaign Structure

```
Campaign: FinGrab | Search | EN-Finance
  Ad Group 1: Yahoo Finance Export   (the core "get data out of Yahoo Finance" intent)
  Ad Group 2: Stock Data → Excel     (spreadsheet / analysis intent)
  Ad Group 3: Chrome Extension       (tool-category / "finance chrome extension" intent)
```

One campaign, three tightly themed IBAGs. Consolidated so Smart Bidding sees pooled conversions (target 30+/mo before tCPA). Each ad group = one RSA, one intent.

---

## Keywords

Match types: `[exact]`, `"phrase"`. Start exact+phrase only. Add broad **after** 30 conv/mo with Smart Bidding live.

### Ad Group 1 — Yahoo Finance Export
```
[yahoo finance export]
[export yahoo finance data]
[yahoo finance csv download]
[download yahoo finance data]
"yahoo finance to excel"
"export yahoo finance to csv"
"yahoo finance data download"
"yahoo finance historical data download"
"download stock data from yahoo finance"
```
Final URL: `https://fingrab.app/` · Path: `fingrab.app/yahoo-finance/export`

### Ad Group 2 — Stock Data → Excel
```
[export stock data to excel]
[download stock data excel]
[stock data to spreadsheet]
"export stock prices to excel"
"historical stock data csv"
"download stock prices spreadsheet"
"stock data export tool"
"ohlcv data download"
"dividend history export"
```
Final URL: `https://fingrab.app/` · Path: `fingrab.app/stock-data/excel`

### Ad Group 3 — Chrome Extension
```
[financial data chrome extension]
[yahoo finance chrome extension]
[stock data chrome extension]
"chrome extension export financial data"
"yahoo finance exporter extension"
"finance data scraper chrome"
"chrome extension stock data"
```
Final URL: `https://fingrab.app/` · Path: `fingrab.app/chrome-extension`

---

## Shared Negative Keyword List — "FinGrab Master Negatives"
Apply to the whole campaign.

```
free stock screener
stock trading platform
yahoo finance login
yahoo mail
stock broker
brokerage account
buy stocks
trading app
robinhood
etrade
fidelity
schwab
day trading course
stock tips
penny stocks
jobs
salary
career
reddit
youtube
tutorial
how to
what is
free api
python api
yfinance
api key
crypto wallet
forex signals
```
Notes: `yfinance`/`python api`/`free api` block developers who want a code library, not an extension. Keep `tutorial`/`how to`/`what is` as informational-intent blocks. Review the **search-terms report weekly**; run N-gram analysis on 1/2/3-word fragments to catch systematic waste (e.g. recurring "login", "app", broker brand names).

---

## Responsive Search Ads

Char limits: **Headlines ≤30**, **Descriptions ≤90**. Counts verified in brackets `[n]`.

### Ad Group 1 RSA — Yahoo Finance Export

**Headlines (15):**
1. Export Yahoo Finance Data [25]
2. Yahoo Finance To CSV [20]
3. Yahoo Finance To Excel [22]
4. One-Click Data Export [21]
5. Download In Seconds [19]
6. No Signup, No API Keys [22]
7. Setup In Under 2 Minutes [24]
8. Raw Data For Excel [18]
9. FinGrab Chrome Extension [24]
10. Grab Financial Data Now [23]
11. Yahoo Finance Exporter [22]
12. CSV Ready For Analysis [22]
13. Free To Install [15]
14. Historical Prices To CSV [24]
15. Skip The Copy-Paste [19]

**Descriptions (4):**
1. Export raw data from Yahoo Finance in one click. CSV ready for Excel & Sheets. [78]
2. No signup, no API keys. Install the Chrome extension and export in 2 minutes. [77]
3. Historical prices, statements, dividends. Download straight to a spreadsheet. [77]
4. Built for investors and analysts. Get the raw data, analyze on your own terms. [78]

**Pinning:** Pin **H9 "FinGrab Chrome Extension"** to Headline position 1 (brand clarity). Leave all others unpinned so Google can optimize. Do not over-pin.

### Ad Group 2 RSA — Stock Data → Excel

**Headlines (15):**
1. Export Stock Data To Excel [26]
2. Stock Prices To Spreadsheet [27]
3. One-Click CSV Export [20]
4. Download OHLCV Data [19]
5. Raw Data For Your Models [24]
6. Skip Manual Copy-Paste [22]
7. From Browser To Excel [21]
8. No Signup Required [18]
9. Dividend History To CSV [23]
10. For Analysts & Traders [22]
11. Setup In Under 2 Minutes [24]
12. FinGrab Chrome Extension [24]
13. Historical Stock Data [21]
14. Free To Install [15]
15. Build Your Portfolio Model [26]

**Descriptions (4):**
1. Export stock prices and OHLCV to CSV. Open in Excel, Sheets or LibreOffice. [75]
2. Stop copying data by hand. One click pulls raw data into your spreadsheet. [74]
3. Historical prices, dividends and statements, ready for pivot tables & charts. [77]
4. Free Chrome extension. No signup, no API keys, no setup headache. Under 2 min. [78]

**Pinning:** Pin **H12 "FinGrab Chrome Extension"** to Headline 1. Rest unpinned.

### Ad Group 3 RSA — Chrome Extension

**Headlines (15):**
1. Finance Data Chrome Tool [24]
2. Yahoo Finance Extension [23]
3. Export Data In One Click [24]
4. No Signup, No API Keys [22]
5. Add FinGrab To Chrome [21]
6. Stock Data Extension [20]
7. Raw Data For Excel [18]
8. Setup In Under 2 Minutes [24]
9. CSV Export For Finance [22]
10. Free To Install [15]
11. Grab Yahoo Finance Data [23]
12. One-Click CSV Download [22]
13. FinGrab For Chrome [18]
14. Local & Private By Design [25]
15. Built For Investors [19]

**Descriptions (4):**
1. The Chrome extension that exports Yahoo Finance data to CSV in one click. [73]
2. No signup, no API keys. Install in under 2 minutes and export instantly. [72]
3. Runs locally in your browser. Your data is never sent to outside servers. [73]
4. Historical prices, dividends and statements, ready for Excel and Sheets. [72]

**Pinning:** Pin **H13 "FinGrab For Chrome"** to Headline 1. Rest unpinned. Aim for "Good"/"Excellent" ad strength — diversity above does that.

---

## Ad Extensions (Assets)

**Sitelinks** (use real routes; site is hash-routed — links go to homepage sections / `#/` paths):
| Text [≤25] | Description lines [≤35] | URL |
|---|---|---|
| How It Works [12] | Install, open Yahoo, export CSV [29] / Three steps under 2 minutes [27] | https://fingrab.app/ |
| What You Can Export [19] | Prices, dividends, statements [27] / Historical OHLCV & key stats [26] | https://fingrab.app/ |
| Add To Chrome [13] | One click from the Web Store [27] / Free to install, no signup [25] | (Chrome Web Store URL) |
| FAQ [3] | Formats, privacy, supported pages [31] / Your questions answered [23] | https://fingrab.app/ |

> Chrome Web Store URL for the "Add To Chrome" sitelink:
> `https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm`

**Callouts (≤25):**
```
One-Click Export
No Signup Needed
No API Keys
CSV For Excel & Sheets
Setup Under 2 Minutes
Runs Locally In Browser
Free To Install
For Investors & Analysts
```

**Structured snippets:**
- Header **"Types"**: `Historical Prices`, `Financial Statements`, `Dividend History`, `Key Statistics`, `OHLCV Data`
- Header **"Featured"**: `One-Click Export`, `CSV Output`, `No Signup`, `Local Processing`

**Promotion asset:**
- Occasion: None / "Special offer"
- Promo text: **"Free to install — no signup"** (avoid % or price claims; freemium product)
- Final URL: Chrome Web Store URL

**Image assets:** add 1.91:1 + 1:1 screenshots of the export button + a resulting CSV in Excel.

---

## Bidding Strategy + Ramp

| Phase | Trigger | Strategy | Why |
|---|---|---|---|
| 1. Seed | Launch, day 0 | **Maximize Clicks**, max CPC €0.60 cap | No conv history; buy data cheaply, fill search-terms report |
| 2. Convert | ≥15 outbound-click conversions logged | **Maximize Conversions** | Hand bidding to the machine once the proxy conversion fires reliably |
| 3. Efficiency | ≥30 conversions/mo, ~4 weeks stable | **tCPA** set to *actual* achieved CPA (not aspirational) | Lock in efficiency; only then test broad match |

- Allow **4 weeks** after any bid-strategy change before judging.
- Never move budget >20% in one step.
- Add broad match keywords only in Phase 3, alongside the master negatives.

**Daily budget:** €20/day launch. **Ad schedule:** Mon–Sun, but weight Mon–Fri 07:00–22:00 (market + evening analysis); start all-hours, trim from data. **Device bias:** it's a desktop browser extension — set **mobile −60% to −80%** and **tablet −80%** bid adjustments; favor **Computers** and **Chrome browser** (Settings → browser targeting where available). Mobile clicks rarely install a desktop extension.

---

## Conversion Tracking Plan

**The real conversion** = "Add to Chrome" install in the Chrome Web Store. **You cannot fire a pixel inside the Web Store** — Google does not let you inject tags on store listing pages, and the store→install handoff is opaque to Ads.

**Workaround — track the outbound click as the optimization proxy:**

1. **Primary conversion (for bidding):** the landing-page click on "Add FinGrab.app to Chrome" that leaves for the Web Store. This is the closest measurable signal to an install.
2. **Implementation (GA4 + Google Ads):**
   - In GA4, the outbound click to `chromewebstore.google.com` is auto-captured by Enhanced Measurement as a `click` event (`outbound = true`). Better: add an explicit GTM/GA4 event `add_to_chrome_click` on the CTA so it's unambiguous and not rate-limited.
   - Mark `add_to_chrome_click` as a **key event** in GA4.
   - **Link GA4 ↔ Google Ads**, import `add_to_chrome_click` as a **conversion**, set it **Primary** for this campaign.
3. **Attribution:** Data-Driven (default). Counting: "One" per click.
4. **Enhanced conversions for web:** enable (hashed first-party data on any future form); ~10% recovery. Low impact now since there's no signup — keep on for later.
5. **Consent Mode v2:** required for EEA/UK serving; implement banner + Consent Mode to preserve modeled conversions (30–50% recovery of consented-out users).

**Secondary (observation, not for bidding):** scroll-depth ≥75%, FAQ open, blog read, time-on-page ≥30s. Watch them; don't bid on them.

**Reality check on the proxy gap:** outbound click ≠ confirmed install. Sanity-check the ratio against **Chrome Web Store Developer Dashboard** weekly install counts. If installs/outbound-clicks drifts, the store listing (screenshots, rating, title) — not the ad — is the leak. The ad's job ends at the outbound click; treat that as the optimization target and the store as a separate CRO surface.

---

## Launch Checklist
- [ ] GA4 `add_to_chrome_click` event live and firing (test in DebugView)
- [ ] GA4 ↔ Ads linked; conversion imported + set Primary
- [ ] Consent Mode v2 + banner deployed (EEA/UK)
- [ ] Search Partners OFF, Display OFF, Search-only confirmed
- [ ] Geo = US/UK/CA/AU/IE, "presence" not "interest"
- [ ] Mobile/tablet bid adjustments −60–80%
- [ ] Master negative list attached to campaign
- [ ] All 3 RSAs "Good"+ ad strength; one brand headline pinned per group
- [ ] Sitelinks, callouts, structured snippets, promotion, images attached
- [ ] Final URLs resolve; Chrome Web Store sitelink opens the listing
- [ ] Budget €20/day; Maximize Clicks with €0.60 CPC cap
- [ ] Weekly recurring task: search-terms review + N-gram + install-ratio check
