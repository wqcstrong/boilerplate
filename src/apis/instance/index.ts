import { extend } from 'umi-request';

import errorHandler from './error-handler';

const request = extend({
  timeout: 10000,
  credentials: 'include',
  prefix: import.meta.env.VITE_API_PREFIX,
  getResponse: false,
  errorHandler,
});

/**
 * @desc 拦截器
 * @desc 查看详情：https://github.com/umijs/umi-request/blob/master/README_zh-CN.md#%E6%8B%A6%E6%88%AA%E5%99%A8
 */
// 请求拦截器
// request.interceptors.request.use((url, options) => {...})

// 响应拦截器
// request.interceptors.response.use((response, option) => {...})

export default request;
