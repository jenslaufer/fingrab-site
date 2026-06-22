#!/usr/bin/env python3
"""Generate a Microsoft Advertising (Bing Ads) refresh token via OAuth auth-code grant.

Prereqs (manual, in web UIs):
  - Microsoft Entra app registration with redirect URI http://localhost:8765/callback
  - Client ID + client secret from that app
  - msads.manage API permission added

Usage:
  export BING_ADS_CLIENT_ID=...        # or it is read from ~/.secrets/bingads.env
  export BING_ADS_CLIENT_SECRET=...
  python3 get-bing-refresh-token.py

It opens the consent page, catches the redirect on localhost:8765,
exchanges the code, and prints the refresh token. Nothing is logged to disk.
"""
import http.server
import os
import sys
import threading
import urllib.parse
import webbrowser

import requests

REDIRECT_URI = "http://localhost:8765/callback"
SCOPE = "https://ads.microsoft.com/msads.manage offline_access"
AUTH_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
TOKEN_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/token"

# Load client id/secret from env or ~/.secrets/bingads.env
def load_env():
    path = os.path.expanduser("~/.secrets/bingads.env")
    if os.path.exists(path):
        for line in open(path):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

load_env()
CLIENT_ID = os.environ.get("BING_ADS_CLIENT_ID", "").strip()
CLIENT_SECRET = os.environ.get("BING_ADS_CLIENT_SECRET", "").strip()

if not CLIENT_ID or not CLIENT_SECRET:
    sys.exit("Set BING_ADS_CLIENT_ID and BING_ADS_CLIENT_SECRET (env or ~/.secrets/bingads.env).")

auth_code = {}

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        q = urllib.parse.urlparse(self.path).query
        params = urllib.parse.parse_qs(q)
        auth_code["code"] = params.get("code", [None])[0]
        auth_code["error"] = params.get("error_description", [None])[0]
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.end_headers()
        msg = "Auth complete. You can close this tab and return to the terminal."
        self.wfile.write(f"<html><body><h2>{msg}</h2></body></html>".encode())

    def log_message(self, *a):
        pass

params = urllib.parse.urlencode({
    "client_id": CLIENT_ID,
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    "response_mode": "query",
})
url = f"{AUTH_URL}?{params}"

server = http.server.HTTPServer(("localhost", 8765), Handler)
threading.Thread(target=server.handle_request, daemon=True).start()

print("\nOpening consent page in your browser…")
print("If it does not open, paste this URL manually:\n")
print(url + "\n")
webbrowser.open(url)

# Wait for the redirect (handle_request serves exactly one request)
import time
for _ in range(300):
    if auth_code:
        break
    time.sleep(1)

if auth_code.get("error"):
    sys.exit(f"OAuth error: {auth_code['error']}")
if not auth_code.get("code"):
    sys.exit("No auth code received (timed out).")

resp = requests.post(TOKEN_URL, data={
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "code": auth_code["code"],
    "redirect_uri": REDIRECT_URI,
    "grant_type": "authorization_code",
    "scope": SCOPE,
})
data = resp.json()
if "refresh_token" not in data:
    sys.exit(f"Token exchange failed: {data}")

print("\n✅ Refresh token obtained. Add this line to ~/.secrets/bingads.env:\n")
print(f"BING_ADS_REFRESH_TOKEN={data['refresh_token']}")
print("\n(Also fill BING_ADS_DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, CUSTOMER_ID, ACCOUNT_ID.)")
