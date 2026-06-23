# FinGrab — Microsoft (Bing) Ads Search Campaign (Launch-Ready)

Companion to `google-ads-campaign.md`. Same product facts and char limits apply (Headlines ≤30, Descriptions ≤90). Counts verified below.

> Microsoft Advertising mirrors Google's RSA/extension limits, so copy is largely portable — but **import, don't copy blindly**. Adapt the items flagged below.

---

## Reuse vs. Adapt

**Reuse via Import (Google Ads → Microsoft):**
- Campaign + 3 ad group structure (Yahoo Finance Export, Stock Data → Excel, Chrome Extension).
- Keyword lists and match types.
- Master negative list.
- RSA headlines/descriptions (already within limits).
- Sitelinks, callouts, structured snippets, promotion.

**Adapt after import (do NOT leave at Google defaults):**
- **Bids −50% to −70%.** Microsoft CPCs run far below Google (often ~$1.5 vs ~$5). Re-importing also re-imports Google bids — cut them.
- **Separate budget.** Budget ≈ **10% of Google spend** to start → **€3–5/day**. Microsoft search volume in this niche is a fraction of Google's.
- **Rewrite the Edge angle** into copy/extensions (below). Google copy says "Chrome"; Edge users need to know it works for them.
- **Add LinkedIn profile targeting** (Microsoft-only lever) — see Audiences.
- **Re-link conversion tracking** with Microsoft's UET tag; Google's tag does not carry over.
- Set up a **weekly auto-import** to keep Google changes flowing, but lock bids/budgets/Edge copy as Microsoft-managed so import doesn't overwrite them.

---

## Microsoft-Specific Angle

- **Audience skews older (35+), higher income, more desktop, more professional finance** — favorable for a paid-grade data tool. Lean copy toward "analysts", "professional", "models".
- **Edge users are the on-platform browser.** Default search engine on Edge = Bing, so a meaningful share of clicks are Edge users.
- **Cheaper CPCs** → the €0.60 Google CPC cap becomes ~€0.20–0.30 here.

### The Edge install path — confirm and message it
The extension is built on Chromium; **Edge runs Chrome Web Store extensions**. But the **only store listing is the Chrome Web Store** — there is no Edge Add-ons listing. Edge users must first allow it:

> Edge → open the Chrome Web Store listing → Edge shows a banner **"Allow extensions from other stores"** → click Allow → **"Add to Chrome"** → **"Add extension"**. Installs and runs in Edge.

**Messaging rule:** don't say "Edge extension" (no Edge store listing) — say **"Works in Edge & Chrome"** and link to the Chrome Web Store listing. Add a one-line install note as a sitelink description so Edge users aren't confused by the "Add to Chrome" button.

---

## Campaign Structure

```
Campaign: FinGrab | Search | MS | EN-Finance
  Ad Group 1: Yahoo Finance Export
  Ad Group 2: Stock Data → Excel
  Ad Group 3: Chrome / Edge Extension
```

- **Geo:** US, UK, CA, AU, IE. (Microsoft skews US — expect US to dominate delivery.)
- **Networks:** Owned & Operated (Bing/Edge) ON. **Audience Network OFF** at launch (it's native/display-style; keep search pure first). **Search Partners** ON is acceptable on Microsoft — quality is better than Google's; monitor and exclude poor publishers.

---

## Keywords
Identical to the Google campaign per ad group; match types `[exact]` / `"phrase"`. Ad Group 3 keywords gain Edge variants:

### Ad Group 3 — Chrome / Edge Extension (additions)
```
[edge extension stock data]
"yahoo finance edge extension"
"finance data extension edge"
```
Plus all Ad Group 3 keywords from `google-ads-campaign.md`. Ad Groups 1 & 2 keywords unchanged.

---

## Shared Negatives
Use the **same "FinGrab Master Negatives"** list from `google-ads-campaign.md`. No changes. Review search terms weekly (Microsoft's search-terms report is lower-volume but reveals the same broker/login/api waste).

---

## Responsive Search Ads

Ad Groups 1 & 2 RSAs: **reuse the Google RSAs verbatim** (already ≤30 / ≤90). Below is the **Edge-adapted Ad Group 3** RSA — the only one that needs rewriting.

### Ad Group 3 RSA — Chrome / Edge Extension

**Headlines (15):**
1. Works In Edge & Chrome [22]
2. Yahoo Finance Extension [23]
3. Export Data In One Click [24]
4. No Signup, No API Keys [22]
5. Finance Data Browser Tool [25]
6. Stock Data Extension [20]
7. Raw Data For Excel [18]
8. Setup In Under 2 Minutes [24]
9. CSV Export For Finance [22]
10. Free To Install [15]
11. Grab Yahoo Finance Data [23]
12. One-Click CSV Download [22]
13. FinGrab For Your Browser [24]
14. Local & Private By Design [25]
15. Built For Analysts [18]

**Descriptions (4):**
1. Export Yahoo Finance data to CSV in one click. Works in Edge and Chrome. [72]
2. No signup, no API keys. Install in under 2 minutes and export instantly. [72]
3. Runs locally in your browser. Your data is never sent to outside servers. [73]
4. Historical prices, dividends and statements, ready for Excel and Sheets. [72]

**Pinning:** Pin **H13 "FinGrab For Your Browser"** to Headline 1. For Ad Groups 1 & 2, keep the same brand-headline pins as the Google build. Rest unpinned. Target "Excellent" ad strength.

---

## Ad Extensions

Reuse Google's **callouts** and **structured snippets** as-is. Adapt **sitelinks** for Edge:

| Text [≤25] | Description lines [≤35] | URL |
|---|---|---|
| How It Works [12] | Install, open Yahoo, export CSV [29] / Three steps under 2 minutes [27] | https://fingrab.app/ |
| What You Can Export [19] | Prices, dividends, statements [27] / Historical OHLCV & key stats [26] | https://fingrab.app/ |
| Install In Edge [15] | Allow from store, then add [25] / Works in Edge and Chrome [24] | (Chrome Web Store URL) |
| FAQ [3] | Formats, privacy, supported pages [31] / Your questions answered [23] | https://fingrab.app/ |

> Chrome Web Store URL (only store listing — Edge installs from here too):
> `https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm`

**Promotion asset:** "Free to install — no signup" → Chrome Web Store URL. Same freemium-safe wording (no % or price claims).

**Add an Edge-aware callout:** `Works In Edge & Chrome` [22] — append to the Google callout set.

---

## Audiences (Microsoft-only lever)

- **LinkedIn profile targeting** (observation first): Industry = *Financial Services, Investment Management, Banking, Capital Markets*; Job function = *Finance, Research, Accounting*; Seniority = Analyst+. Microsoft reports +16% CTR / +64% CVR when layered. Start **observe**, shift to bid-up once data confirms.
- **In-market:** Investing / Financial Services audiences in observe mode.
- **Device:** desktop browser extension — set **mobile −60–80%**, tablet −80%. Microsoft's higher desktop share already helps.
- **Ad schedule:** Mon–Fri weighted 07:00–22:00; start all-hours, trim from data.

---

## Budget + Bidding

| Phase | Strategy | Notes |
|---|---|---|
| 1. Seed | **Manual CPC** or Max Clicks, cap ~€0.25 | Microsoft conversion data accrues slowly; manual keeps cost down |
| 2. Convert | **Maximize Conversions** | Once UET fires the outbound-click goal reliably |
| 3. Efficiency | **tCPA** at achieved CPA | Only after ~30 conv/mo (may take longer here than Google) |

- **Daily budget:** €3–5/day launch (~10% of Google).
- Bids −50–70% vs. imported Google values.
- Same rules: no >20% budget jumps, allow 4 weeks per bid-strategy change.

---

## Conversion Tracking Plan

Same limitation as Google: **no pixel can fire inside the Chrome Web Store.** Track the **outbound "Add to Chrome" click** as the optimization proxy.

1. Install the **Microsoft UET tag** site-wide (separate from GA4/Google tag).
2. Create a **UET conversion goal** on the outbound click to `chromewebstore.google.com` — either an **Event goal** (`category=cta, action=add_to_chrome_click`, push via the same GTM trigger used for GA4) or a **Destination/outbound** goal. Event goal is cleaner.
3. Mark it the **Primary conversion** for bidding.
4. **Consent:** Microsoft Consent Mode — pass consent signals so EEA/UK conversions stay measured.
5. **Cross-check** outbound clicks against Chrome Web Store Developer Dashboard installs weekly; the proxy ≠ confirmed install, and the store listing is a separate CRO surface.

Secondary/observation events (scroll, FAQ open, time-on-page): track, don't bid on.

---

## Launch Checklist
- [ ] Import from Google complete; structure + keywords + negatives present
- [ ] Bids cut −50–70%; budget set €3–5/day (separate from Google)
- [ ] Ad Group 3 RSA replaced with Edge-adapted version; "Install In Edge" sitelink + Edge callout added
- [ ] UET tag live; outbound-click goal firing (test) and set Primary
- [ ] Microsoft Consent Mode configured (EEA/UK)
- [ ] LinkedIn profile targeting attached in **observe** mode
- [ ] Mobile/tablet bid adjustments −60–80%
- [ ] Audience Network OFF; Search Partners monitored
- [ ] Geo US/UK/CA/AU/IE
- [ ] Auto-import scheduled weekly; bids/budget/Edge copy locked as Microsoft-managed
- [ ] Weekly task: search-terms review + N-gram + install-ratio cross-check
