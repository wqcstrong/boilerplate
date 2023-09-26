import request from './instance';

export function getUserInfo() {
  return request.get('/todos');
}
