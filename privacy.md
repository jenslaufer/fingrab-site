# FinGrab – Privacy Policy

> Export historical OHLCV data from Yahoo Finance as CSV with one click. Free Chrome extension — no signup, ready for Excel, Google Sheets, or any analysis tool.

Source: https://fingrab.app/privacy

Last updated: March 5, 2026

# FinGrab

## Privacy Policy

FinGrab is a browser extension that exports historical OHLCV data from Yahoo Finance as CSV. This policy explains what data is handled, by whom, and your rights under applicable law including the GDPR.

### 1\. No Personal Data Collected

FinGrab does not collect, store, transmit, or process any personal data on any server operated by FinGrab. The extension requires no account, no registration, and no login. No cookies are set by the extension.

### 2\. Local Processing Only

All data processing happens entirely within your browser. When you trigger an export, the extension fetches publicly available OHLCV data directly from Yahoo Finance and writes it to a CSV file on your device. No data passes through any FinGrab-controlled server at any point.

### 3\. Browser Permissions

FinGrab declares the following permissions. This list is generated from the manifest of the package published in the store, so it cannot drift away from what you actually grant on install.

-   storageStores your settings and licence status locally in your browser. Nothing is sent anywhere.
-   sidePanelOpens the extension interface in Chrome's side panel. No data is read or transmitted.
-   https://finance.yahoo.com/\*Reads the Yahoo Finance page you are on to pick up the ticker symbol. Used locally, never transmitted to FinGrab.
-   https://query1.finance.yahoo.com/\*Fetches the OHLCV data for your export directly from the public Yahoo Finance API.
-   https://query2.finance.yahoo.com/\*Fallback endpoint for the same public Yahoo Finance API, used when query1 does not answer.

The extension runs only on Yahoo Finance pages. It is not active on any other site.

### 4\. Third-Party Services

FinGrab interacts with two external services. Their own privacy policies govern how they handle data.

#### Yahoo Finance API

OHLCV data is fetched directly from query1.finance.yahoo.com (with query2.finance.yahoo.com as fallback). These are public API endpoints. Your request will carry standard browser metadata (IP address, User-Agent) as governed by Yahoo's privacy policy at [legal.yahoo.com/us/en/yahoo/privacy](https://legal.yahoo.com/us/en/yahoo/privacy/index.html) .

#### ExtPay (Payment Processing)

Payment status for the paid tier is managed by ExtPay ([extensionpay.com](https://extensionpay.com)). FinGrab does not process payments, store payment data, or have access to your billing details. Any personal data you provide during checkout is handled solely by ExtPay under their privacy policy at [extensionpay.com/privacy](https://extensionpay.com/privacy) .

### 5\. Analytics and Tracking

FinGrab contains no analytics, crash reporting, advertising SDKs, or any other tracking mechanism. No usage data is collected in any form.

### 6\. Data Retention

Because FinGrab collects no personal data, there is nothing to retain or delete on our side. Exported CSV files are saved to your local device and remain fully under your control.

### 7\. Your Rights (GDPR)

If you are located in the European Economic Area, you have rights under the General Data Protection Regulation (GDPR) including access, rectification, erasure, restriction, portability, and the right to object. Because FinGrab processes no personal data, these rights have no practical application to FinGrab's own operations.

For data processed by Yahoo Finance or ExtPay, please contact those services directly via their respective privacy policies linked in Section 4.

### 8\. Children's Privacy

FinGrab is not directed at children under 13 (or under 16 in the EEA). No information is knowingly collected from children.

### 9\. Changes to This Policy

If this policy changes materially, the updated version will be published here with a revised "Last updated" date. Continued use of the extension after a change constitutes acceptance of the revised policy.

### 10\. Contact

Questions or concerns about this privacy policy can be sent to [jens.laufer@solytics.de](mailto:jens.laufer@solytics.de) .
