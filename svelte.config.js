import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const extensions = ['.svelte', '.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      handleHttpError: ({ path }) => {
        if (path.indexOf('.avif') !== -1 || path.indexOf('.webp') !== -1 || path.indexOf('.png') !== -1) {
          // Ignore 404 errors for images (as they're likely not optimized yet at build time)
          return;
        }
        // Handle other HTTP errors if necessary
      }
    }
  },
  preprocess: [vitePreprocess()],
  extensions: extensions
};

export default config;
