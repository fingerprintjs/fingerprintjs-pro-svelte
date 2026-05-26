#!/usr/bin/env bash
# Typecheck all example apps (Svelte 4 and Svelte 5).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Checking Svelte 4 examples..."
pnpm -C "$ROOT/examples/svelte-kit" exec svelte-kit sync
svelte-check --tsconfig "$ROOT/examples/svelte-kit/tsconfig.json"
svelte-check --tsconfig "$ROOT/examples/spa/tsconfig.json"

echo "==> Checking Svelte 5 examples..."
pnpm -C "$ROOT/examples/svelte5-svelte-kit" exec svelte-kit sync
pnpm -C "$ROOT/examples/svelte5-svelte-kit" exec svelte-check --tsconfig tsconfig.json
pnpm -C "$ROOT/examples/svelte5-spa" exec svelte-check --tsconfig tsconfig.json

echo "All example checks passed."
