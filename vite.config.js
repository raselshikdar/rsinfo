import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            $routes: path.resolve('./src/routes'),
            $cms: path.resolve('./cms'),
            '@inlang/paraglide-js': path.resolve('./node_modules/@inlang/paraglide-js/dist/runtime')
        }
    }
};

export default config;
