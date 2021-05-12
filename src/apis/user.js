import request from './instance';

/**
 * @desc 支持 ts/js 混合开发。注意：导入时文件的后缀需要显式的表明，在这里是 .js
 */
export function getUserInfo() {
  return request.get('/userinfo');
}
