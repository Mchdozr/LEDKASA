#!/usr/bin/env bash
# Plesk Git "ek dağıtım eylemleri" için: panel Node 16 olsa bile
# resmi Node 22 ikilisini indirip Astro build çalıştırır.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

NODE_VERSION="22.14.0"
NODE_DIR="$ROOT/.plesk-node/node-v${NODE_VERSION}-linux-x64"
NODE_BIN="$NODE_DIR/bin"
NODE_TARBALL="node-v${NODE_VERSION}-linux-x64.tar.xz"
NODE_URL="https://nodejs.org/dist/v${NODE_VERSION}/${NODE_TARBALL}"

mkdir -p "$ROOT/.plesk-node"

if [[ ! -x "$NODE_BIN/node" ]]; then
  echo "[plesk-deploy] Node ${NODE_VERSION} indiriliyor..."
  curl -fsSL "$NODE_URL" -o "$ROOT/.plesk-node/${NODE_TARBALL}"
  tar -xJf "$ROOT/.plesk-node/${NODE_TARBALL}" -C "$ROOT/.plesk-node"
  rm -f "$ROOT/.plesk-node/${NODE_TARBALL}"
fi

export PATH="$NODE_BIN:$PATH"
echo "[plesk-deploy] $(node -v) / $(npm -v)"

npm ci
npm run build

echo "[plesk-deploy] dist/ hazır."
