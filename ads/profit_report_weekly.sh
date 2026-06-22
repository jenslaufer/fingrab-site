#!/usr/bin/env bash
# Weekly FinGrab profitability report -> Telegram. Installed as a cron job.
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"

set -a
source "$HOME/.secrets/bingads.env"
source "$HOME/.secrets/stripe.env"
source "$HOME/.secrets/telegram-assistant.env"
set +a

cd "$HOME/repos/fingrab-site/ads"
OUT="$(uv run --quiet profit_report.py 7 2>&1)"

curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=📊 FinGrab Ads
${OUT}" >/dev/null
