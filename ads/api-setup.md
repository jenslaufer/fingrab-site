# API-Anbindung — Google Ads & Microsoft (Bing) Ads

Anleitung zum Beschaffen der API-Credentials für programmatischen Zugriff auf
Google Ads und Microsoft Advertising. Ziel: ein einzelnes Werbekonto (FinGrab)
per API steuern — Kampagnen anlegen, ändern, pausieren, Reports ziehen.

## Kosten — kurz

Beide APIs sind **kostenlos**. Du zahlst nur das Anzeigenbudget.

| Posten | Kosten |
|---|---|
| Google Ads API (Explorer/Basic/Standard Access) | 0 € |
| Microsoft Advertising API + Developer-Token | 0 € |
| Microsoft Entra (Azure AD) App-Registrierung | 0 € |
| Google Cloud Projekt (nur OAuth-Client) | 0 € |
| **Tatsächliche Werbekosten** | Dein Budget |

Es gibt keine Gebühr für den Developer-Token, die App-Registrierung oder
API-Aufrufe. Rate-Limits ja, Gebühren nein.

---

## Google Ads API

### Was du am Ende brauchst

Sechs Werte landen in `~/.secrets/google-ads.env`:

| Variable | Was | Woher |
|---|---|---|
| `GOOGLE_ADS_DEVELOPER_TOKEN` | Partner-Schlüssel | API Center eines **Manager-Kontos (MCC)** |
| `GOOGLE_ADS_CLIENT_ID` | OAuth2-Client-ID | Google Cloud Projekt |
| `GOOGLE_ADS_CLIENT_SECRET` | OAuth2-Secret | Google Cloud Projekt |
| `GOOGLE_ADS_REFRESH_TOKEN` | Langzeit-Token | OAuth-Consent-Flow |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | MCC-Konto-ID | Manager-Konto, nur Ziffern, keine Bindestriche |
| `GOOGLE_ADS_CUSTOMER_ID` | FinGrab-Konto-ID | Das Konto, in dem die Kampagnen laufen |

### Schritte

**1. Manager-Konto (MCC) anlegen — falls noch keins da.**
Der Developer-Token wird über das **API Center eines Manager-Kontos** ausgestellt,
nicht über ein normales Werbekonto. Lege unter
[ads.google.com/home/tools/manager-accounts](https://ads.google.com/home/tools/manager-accounts)
ein MCC an und verknüpfe dein FinGrab-Werbekonto darunter.

**2. Developer-Token beantragen.**
Im Manager-Konto: **Tools & Settings → Setup → API Center**. Den
Developer-Token-String kopieren → `GOOGLE_ADS_DEVELOPER_TOKEN`.

- Standard-Stufe ist **Explorer Access**: läuft gegen Produktivkonten, aber mit
  Limits. Für ernsthaften Betrieb **Basic Access** beantragen (Formular im API
  Center). Genehmigung dauert i.d.R. wenige Werktage.
- Hinweis 2026: Google führt zusätzlich „Cloud-managed access levels" ein — eine
  Variante, bei der die Zugriffsstufe über das Cloud-Projekt verwaltet wird statt
  rein über den Token. Für ein Ein-Konto-Setup reicht der klassische Weg oben.

**3. Google Cloud Projekt + OAuth-Client.**
[console.cloud.google.com](https://console.cloud.google.com) → Projekt anlegen →
**APIs & Services → Library →** „Google Ads API" aktivieren → **Credentials →
Create Credentials → OAuth client ID → Type: Desktop app**.
ID und Secret → `GOOGLE_ADS_CLIENT_ID` / `GOOGLE_ADS_CLIENT_SECRET`.
OAuth-Consent-Screen vorher konfigurieren (External, dich selbst als Test-User
eintragen).

**4. Refresh-Token erzeugen.**
Einmaliger Consent-Flow mit Client-ID/Secret. Schnellster Weg ohne eigenen Code:
das Google-Ads-Python-Skript `generate_user_credentials.py` aus den
[offiziellen Beispielen](https://github.com/googleads/google-ads-python), oder der
[OAuth 2.0 Playground](https://developers.google.com/oauthplayground) mit Scope
`https://www.googleapis.com/auth/adwords`. Den `refresh_token` →
`GOOGLE_ADS_REFRESH_TOKEN`.

**5. Konto-IDs eintragen.**
Die 10-stellige ID oben rechts im Ads-UI. MCC-ID → `GOOGLE_ADS_LOGIN_CUSTOMER_ID`,
FinGrab-Konto-ID → `GOOGLE_ADS_CUSTOMER_ID`. Jeweils **nur Ziffern**, Bindestriche
entfernen (`123-456-7890` → `1234567890`).

### Verifizieren

```bash
source ~/.secrets/google-ads.env
# Mit installiertem google-ads Python-Client:
# python -c "from google.ads.googleads.client import GoogleAdsClient; GoogleAdsClient.load_from_env()"
```

---

## Microsoft (Bing) Ads API

### Was du am Ende brauchst

Sechs Werte in `~/.secrets/bingads.env`:

| Variable | Was | Woher |
|---|---|---|
| `BING_ADS_DEVELOPER_TOKEN` | Universal-Token | Dev-Settings im Ads-UI |
| `BING_ADS_CLIENT_ID` | Application (client) ID | Microsoft-Entra-App-Registrierung |
| `BING_ADS_CLIENT_SECRET` | Client-Secret | Microsoft-Entra-App-Registrierung |
| `BING_ADS_REFRESH_TOKEN` | Langzeit-Token | OAuth-Consent-Flow |
| `BING_ADS_CUSTOMER_ID` | Customer-ID (`cid`) | Kampagnen-URL im Ads-UI |
| `BING_ADS_ACCOUNT_ID` | Account-ID (`aid`) | Kampagnen-URL im Ads-UI |

### Schritte

**1. Microsoft-Advertising-Konto.**
Falls nicht vorhanden: [ads.microsoft.com](https://ads.microsoft.com/) anlegen.

**2. Developer-Token holen.**
Als **Super Admin** einloggen, dann
[ads.microsoft.com/cc/Settings/DevSettings](https://ads.microsoft.com/cc/Settings/DevSettings)
(neue Seite seit Mai 2025, alte „Developer Portal"-Seite ist abgekündigt) →
**Request Token**. Es entsteht ein **Universal-Token**, der mit jedem berechtigten
Nutzer funktioniert. String → `BING_ADS_DEVELOPER_TOKEN`.

- Zum Testen ohne echtes Budget gibt es eine Sandbox mit festem Universal-Token
  `BBD37VB98` ([sandbox.bingads.microsoft.com](https://sandbox.bingads.microsoft.com/)).
  Sandbox- und Produktiv-Credentials sind getrennt.

**3. App in Microsoft Entra (Azure AD) registrieren.**
[portal.azure.com](https://portal.azure.com) → **Microsoft Entra ID → App
registrations → New registration**. Redirect-URI setzen (z.B.
`http://localhost` für lokale Flows). Nach dem Anlegen:

- **Application (client) ID** → `BING_ADS_CLIENT_ID`
- **Certificates & secrets → New client secret** → Wert → `BING_ADS_CLIENT_SECRET`
- Unter **API permissions** die Microsoft-Advertising-Berechtigung
  (`https://ads.microsoft.com/msads.manage`) hinzufügen.

Die App-Registrierung ist kostenlos.

**4. Refresh-Token erzeugen.**
Consent-Flow mit Client-ID/Secret und Scope `https://ads.microsoft.com/msads.manage`
gegen die Microsoft-Authorize-URL. Am einfachsten über das Bing-Ads-SDK
([Python](https://learn.microsoft.com/advertising/guides/get-started-python),
`oauth_desktop_mobile_auth_code_grant`). Den Refresh-Token →
`BING_ADS_REFRESH_TOKEN`.

**5. Customer- und Account-ID.**
Im Ads-UI auf den **Campaigns**-Tab. Die URL enthält
`...?cid=<Customer>&aid=<Account>...`. `cid` → `BING_ADS_CUSTOMER_ID`,
`aid` → `BING_ADS_ACCOUNT_ID`.
**Achtung:** Nicht die achtstellige „Account-Nummer" aus dem UI nehmen — die API
braucht die **Account-ID** (`aid`), nicht die Account-Nummer.

### Edge-Hinweis (FinGrab-spezifisch)

FinGrab läuft auch in Edge (Chromium), aber es gibt nur ein Chrome-Web-Store-
Listing. Microsoft-Kampagnen sollten in der Copy „Works in Edge & Chrome" sagen
und den Edge-Install-Pfad erklären — Setup in `microsoft-ads-campaign.md`.

---

## Sicherheit

- Alle Werte gehören in `~/.secrets/` und **nie ins Repo**. Quelle der Wahrheit
  für die Dateizuordnung ist `~/.secrets/README.md`.
- Vor jedem API-Call die passende `.env` sourcen, z.B.
  `source ~/.secrets/google-ads.env`.
- Secrets nie echoen, committen oder in Logs/PRs pasten.

## Quellen

- [Google Ads API — Developer Token](https://developers.google.com/google-ads/api/docs/api-policy/developer-token)
- [Google Ads API — Access levels and RMF](https://developers.google.com/google-ads/api/docs/productionize/access-levels)
- [Google Ads API — Cloud-managed access levels](https://developers.google.com/google-ads/api/docs/concepts/no-developer-token)
- [Microsoft Advertising — Get Started](https://learn.microsoft.com/advertising/guides/get-started)
- [Microsoft Advertising — Register an application](https://learn.microsoft.com/advertising/guides/authentication-oauth-register)
- [Azure-App-Registrierung ist kostenlos](https://learn.microsoft.com/answers/questions/1111512/application-registration-cost)
