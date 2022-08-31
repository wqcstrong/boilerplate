import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default ({ command, mode }) => {
  const isProd = mode === 'production';

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
    plugins: [react(), svgr()],
  });
};
