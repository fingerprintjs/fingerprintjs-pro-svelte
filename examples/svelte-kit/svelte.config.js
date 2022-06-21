import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      optimizeDeps: {
        include: ['@fingerprintjs/fingerprintjs-pro-svelte'],
      },
    },
  },
};

export default config;
