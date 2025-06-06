import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'robots.txt',
          dest: '',
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://rhum-back.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
