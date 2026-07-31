#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${HOLOSYN_PORT:-4173}"
HOST="127.0.0.1"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required to run HOLOSYN."
  echo "Install Python 3, then run this launcher again."
  read -r -p "Press Enter to close..."
  exit 1
fi

while lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

URL="http://$HOST:$PORT/index.html?viewer=1&exhibit=1"

echo "Starting HOLOSYN Exhibition Mode..."
echo "Folder: $(pwd)"
echo "URL: $URL"
echo
echo "This mode uses bundled assets and can run without internet."
echo "Keep this window open. Press Control+C to stop."
echo

python3 -m http.server "$PORT" --bind "$HOST" &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

sleep 1

if [ "${HOLOSYN_OPEN:-1}" = "1" ]; then
  open "$URL"
fi

wait "$SERVER_PID"
