'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const child_process_1 = require('child_process');
function gitClone(params, callback) {
  const { url, branch = '', localPath } = params;
  const args = ['git clone'];
  if (!!branch === true) {
    args.push(`-b ${branch}`);
  }
  args.push('--');
  args.push(url);
  args.push(localPath);
  child_process_1.exec(args.join(' '), (err) => {
    callback && callback(err);
  });
}
exports.default = gitClone;
