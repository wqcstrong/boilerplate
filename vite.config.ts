import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import styleImport, { AntdResolve } from 'vite-plugin-style-import';
import svgr from 'vite-plugin-svgr';
import antdDayjs from 'antd-dayjs-vite-plugin';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default ({ command, mode }) => {
  const isProd = mode === 'production';

  return defineConfig({
    build: {
      target: ['chrome61', 'firefox60', 'safari14', 'edge79', 'ios14'],
      sourcemap: isProd ? 'hidden' : true,
    },
    resolve: {
      alias: [{ find: '@', replacement: path.join(__dirname, './src') }],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import "${process.cwd()}/src/assets/style/variable.less";`,
          },
        },
      },
    },
    plugins: [
      ViteEjsPlugin(),
      react(),
      svgr(),
      styleImport({
        resolves: [AntdResolve()],
      }),
      antdDayjs(),
    ],
  });
};
