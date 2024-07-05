import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '/dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  publicDir: '/public',
});
