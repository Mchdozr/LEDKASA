#!/bin/bash
# Plesk chroot uyumlu deploy: panel Node 16 / PATH kısıtı için
# resmi Node 22 indirip Astro build çalıştırır.
set -eu

SCRIPT="${BASH_SOURCE[0]-$0}"
case "$SCRIPT" in
  /*) SCRIPT_PATH="$SCRIPT" ;;
  *) SCRIPT_PATH="$(pwd)/$SCRIPT" ;;
esac
SCRIPT_DIR="${SCRIPT_PATH%/*}"
ROOT="${SCRIPT_DIR}/.."
cd "$ROOT"

NODE_VERSION="22.14.0"
CACHE_DIR="$ROOT/.plesk-node"
NODE_DIR="$CACHE_DIR/node-v${NODE_VERSION}-linux-x64"
NODE_BIN="$NODE_DIR/bin"
NODE_TARBALL="node-v${NODE_VERSION}-linux-x64.tar.xz"
NODE_URL="https://nodejs.org/dist/v${NODE_VERSION}/${NODE_TARBALL}"

mkdir -p "$CACHE_DIR"

if [ ! -x "$NODE_BIN/node" ]; then
  echo "[plesk-deploy] Node ${NODE_VERSION} indiriliyor..."
  # Chroot'ta CA sertifikaları genelde yok → SSL doğrulamasız
  curl -kfsSL "$NODE_URL" -o "$CACHE_DIR/$NODE_TARBALL"
  tar -xJf "$CACHE_DIR/$NODE_TARBALL" -C "$CACHE_DIR"
  rm -f "$CACHE_DIR/$NODE_TARBALL"
fi

export PATH="$NODE_BIN:$PATH"
hash -r 2>/dev/null || true
echo "[plesk-deploy] $(node -v) / $(npm -v)"

npm ci
npm run build

echo "[plesk-deploy] dist/ hazır."
