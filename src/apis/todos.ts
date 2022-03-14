import request from './instance';

export function getTodos() {
  return request.get('/todos');
}
