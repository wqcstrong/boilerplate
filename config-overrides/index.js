const { override, addWebpackAlias } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');
const path = require('node:path');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#038fde'
        }
      }
    }),
    addWebpackAlias({
      '@': path.resolve('./src')
    })
  ),
  devServer(configFn) {
    return (proxy, allowedHost) => {
      const config = configFn(proxy, allowedHost);

      // 配置转发
      config.proxy = {
        '/api': {
          target: 'path/to/api-server',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      };
      return config;
    };
  }
};
