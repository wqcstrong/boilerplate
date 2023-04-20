import { defineConfig } from 'vite';
import path from 'path';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import ssl from '@vitejs/plugin-basic-ssl';

export default ({ command, mode }) => {
  const isProd = command === 'build';

  return defineConfig({
    build: {
      target: ['chrome61', 'firefox60', 'safari14', 'edge79', 'ios14'],
      sourcemap: isProd ? 'hidden' : true,
    },
    esbuild: {
      logOverride: {
        'this-is-undefined-in-esm': 'silent',
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: path.join(__dirname, './src') }],
    },
    plugins: [ViteEjsPlugin(), ssl()],
  });
};
