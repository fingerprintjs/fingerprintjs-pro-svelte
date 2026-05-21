#!/usr/bin/env bash
# Smoke test: build the SDK, pack it into a tarball (the same artifact
# `npm publish` would upload), then install it from the tarball into
# minimal Svelte 4 and Svelte 5 fixture apps and run `tsc --noEmit`.
#
# This catches problems that unit tests can't:
#   - Missing files in the package.json `files` field
#   - Broken `exports` map (entry points that don't resolve)
#   - Types that reference internal files not included in the package
#   - Import paths that work in the monorepo (workspace hoisting) but
#     break for real consumers

# Stop script on error, pipefail, and undefined variables.
set -euo pipefail

SMOKE_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SMOKE_DIR/../.." && pwd)"

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

# Always clean up temp artifacts, even if the script fails midway.
trap cleanup EXIT

# Copy tarball into each fixture with the expected name
cp "$SMOKE_DIR/$TARBALL_NAME" "$SMOKE_DIR/svelte4/fingerprintjs-pro-svelte.tgz"
cp "$SMOKE_DIR/$TARBALL_NAME" "$SMOKE_DIR/svelte5/fingerprintjs-pro-svelte.tgz"

for fixture in svelte4 svelte5; do
  echo ""
  echo "==> Smoke testing $fixture fixture..."
  (
    cd "$SMOKE_DIR/$fixture"
    # --ignore-workspace is critical: without it pnpm resolves the SDK
    # from the workspace link instead of the tarball, defeating the test.
    pnpm install --ignore-workspace
    npx tsc --noEmit
    echo "    $fixture: PASSED"
  )
done

echo ""
echo "All smoke tests passed."
