#!/usr/bin/env bash
# Smoke test: pack the SDK tarball and verify it installs + type-checks
# against both Svelte 4 and Svelte 5.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SMOKE_DIR="$ROOT/__tests__/smoke"

echo "==> Building the SDK..."
(cd "$ROOT" && pnpm build)

echo "==> Packing the SDK tarball..."
TARBALL="$(cd "$ROOT" && pnpm pack --pack-destination "$SMOKE_DIR" 2>/dev/null | tail -1)"
TARBALL_NAME="$(basename "$TARBALL")"

echo "    Tarball: $TARBALL_NAME"

cleanup() {
  rm -f "$SMOKE_DIR/$TARBALL_NAME"
  rm -f "$SMOKE_DIR/svelte4/fingerprintjs-pro-svelte.tgz"
  rm -f "$SMOKE_DIR/svelte5/fingerprintjs-pro-svelte.tgz"
  rm -rf "$SMOKE_DIR/svelte4/node_modules" "$SMOKE_DIR/svelte4/pnpm-lock.yaml"
  rm -rf "$SMOKE_DIR/svelte5/node_modules" "$SMOKE_DIR/svelte5/pnpm-lock.yaml"
}
trap cleanup EXIT

# Copy tarball into each fixture with the expected name
cp "$SMOKE_DIR/$TARBALL_NAME" "$SMOKE_DIR/svelte4/fingerprintjs-pro-svelte.tgz"
cp "$SMOKE_DIR/$TARBALL_NAME" "$SMOKE_DIR/svelte5/fingerprintjs-pro-svelte.tgz"

for fixture in svelte4 svelte5; do
  echo ""
  echo "==> Smoke testing $fixture fixture..."
  (
    cd "$SMOKE_DIR/$fixture"
    # Use --ignore-workspace to avoid pnpm workspace resolution
    pnpm install --ignore-workspace
    npx tsc --noEmit
    echo "    $fixture: PASSED"
  )
done

echo ""
echo "All smoke tests passed."
