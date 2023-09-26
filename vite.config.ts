import { defineConfig } from 'vite';
import path from 'path';

export default ({ command, mode }) => {
  const isProd = command === 'build';

  return defineConfig({
    resolve: {
      alias: [{ find: '@', replacement: path.join(__dirname, './src') }],
    },
  });
};
