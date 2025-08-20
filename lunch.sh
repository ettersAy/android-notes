#!/usr/bin/env bash
# lunch.sh
set -euo pipefail

cd "$(dirname "$0")"

EXPECTED_ASYNC="2.1.2"
EXPECTED_SAFE_AREA="5.4.0"

echo "[launch] Checking prerequisites..."
if ! command -v node >/dev/null 2>&1; then
  echo "[launch] Node.js is missing. Running install.sh..."
  bash ./install.sh
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[launch] npm is missing. Running install.sh..."
  bash ./install.sh
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "[launch] Error: Requires Node.js >= 18. Current: $(node -v)"
  exit 1
fi

NPM_MAJOR="$(npm -v | awk -F. '{print $1}')"
if [ "$NPM_MAJOR" -lt 9 ]; then
  echo "[launch] Warning: npm >= 9 recommended. Current: $(npm -v)"
fi

NEED_INSTALL=0

if [ ! -d node_modules ]; then
  echo "[launch] node_modules missing."
  NEED_INSTALL=1
else
  ASYNC_VER="$(node -e "try{console.log(require('./node_modules/@react-native-async-storage/async-storage/package.json').version)}catch(e){console.log('missing')}" 2>/dev/null || true)"
  SAFE_VER="$(node -e "try{console.log(require('./node_modules/react-native-safe-area-context/package.json').version)}catch(e){console.log('missing')}" 2>/dev/null || true)"

  if [ "$ASYNC_VER" != "$EXPECTED_ASYNC" ]; then
    echo "[launch] @react-native-async-storage/async-storage version $ASYNC_VER != $EXPECTED_ASYNC"
    NEED_INSTALL=1
  fi
  if [ "$SAFE_VER" != "$EXPECTED_SAFE_AREA" ]; then
    echo "[launch] react-native-safe-area-context version $SAFE_VER != $EXPECTED_SAFE_AREA"
    NEED_INSTALL=1
  fi
fi

if [ "$NEED_INSTALL" -eq 1 ]; then
  echo "[launch] Running install.sh to fix dependencies..."
  bash ./install.sh
fi

echo "[launch] Starting Expo (tunnel)..."
exec npx expo start --tunnel