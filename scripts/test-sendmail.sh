#!/usr/bin/env bash
set -euo pipefail
exec "${LEDKASA_TEST_NODE:-node}" "${LEDKASA_TEST_SENDMAIL_JS}" "$@"
