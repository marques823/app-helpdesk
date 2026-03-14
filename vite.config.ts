import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8002',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyRes', (proxyRes, req, res) => {
              const setCookie = proxyRes.headers['set-cookie'];
              if (setCookie) {
                proxyRes.headers['set-cookie'] = setCookie.map(cookie => {
                  // For local development on HTTP, SameSite=Lax is safer than None+Secure
                  let newCookie = cookie.replace(/SameSite=[a-zA-Z]+/i, 'SameSite=Lax');
                  if (!/SameSite=Lax/i.test(newCookie)) {
                    newCookie += '; SameSite=Lax';
                  }
                  // Remove Secure flag if we are not on HTTPS
                  newCookie = newCookie.replace(/;\s*Secure/i, '');
                  
                  // Also clear Domain so the browser attaches it to localhost
                  newCookie = newCookie.replace(/Domain=[^;]+/i, '');
                  
                  return newCookie;
                });
              }
            });
          }
        }
      }
    },
  };
});
