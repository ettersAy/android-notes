#!/usr/bin/env bash
# install.sh
set -euo pipefail

EXPECTED_ASYNC="2.1.2"
EXPECTED_SAFE_AREA="5.4.0"

cd "$(dirname "$0")"

echo "[install] Verifying Node.js and npm..."
if ! command -v node >/dev/null 2>&1; then
  echo "[install] Error: Node.js not found on PATH."
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "[install] Error: npm not found on PATH."
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "[install] Error: Requires Node.js >= 18. Current: $(node -v)"
  exit 1
fi

echo "[install] Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "[install] Pinning Expo-compatible packages..."
npm install -E \
  @react-native-async-storage/async-storage@"$EXPECTED_ASYNC" \
  react-native-safe-area-context@"$EXPECTED_SAFE_AREA"

echo "[install] Done."
