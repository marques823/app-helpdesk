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
          target: 'https://helpdesk.tecnicolitoral.com',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: "",
          headers: {
            'Origin': 'https://helpdesk.tecnicolitoral.com',
            'Referer': 'https://helpdesk.tecnicolitoral.com/'
          },
          configure: (proxy, _options) => {
            proxy.on('proxyRes', (proxyRes, req, res) => {
              const setCookie = proxyRes.headers['set-cookie'];
              if (setCookie) {
                proxyRes.headers['set-cookie'] = setCookie.map(cookie => {
                  let newCookie = cookie.replace(/SameSite=[a-zA-Z]+/i, 'SameSite=None');
                  if (!/SameSite=None/i.test(newCookie)) {
                    newCookie += '; SameSite=None';
                  }
                  if (!/Secure/i.test(newCookie)) {
                    newCookie += '; Secure';
                  }
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
