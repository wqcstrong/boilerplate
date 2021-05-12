const {
  override,
  addLessLoader,
  addWebpackPlugin,
  addBabelPlugin
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: override(
    addLessLoader({
      modifyVars: {
        hack: `true; @import "${process.cwd()}/src/assets/style/variable.less";`
      },
      javascriptEnabled: true
    }),
    addBabelPlugin([
      'import',
      {
        libraryName: 'antd',
        style: true
      }
    ]),
    addWebpackPlugin(new AntdDayjsWebpackPlugin())
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
