# Example SvelteKit application (Svelte 5)

## Getting started

1. Create `.env` with your public API key:

```dotenv
VITE_API_KEY=<YOUR_API_KEY>
```

2. Run `pnpm install` in repository root directory, this will install dependencies for all example applications.
3. Run `cd examples/svelte5-svelte-kit` and `pnpm dev` to start the application.
4. Open http://localhost:5173 in your browser

## Learn more

This application uses [SvelteKit 2](https://svelte.dev/docs/kit/introduction) with [Svelte 5](https://svelte.dev/docs/svelte/overview). The SDK uses the Svelte 4 store API, which Svelte 5 supports via its built-in [legacy mode](https://svelte.dev/docs/svelte/legacy-overview).
