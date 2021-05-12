import { message } from 'antd';
import type { ResponseError } from 'umi-request';

const SSO_URL = '';

export default function errorHandler(error: ResponseError) {
  const { status } = error.response;
  if (status === 401) {
    message.error('登录过期', 1500).then(() => {
      if (SSO_URL) {
        window.location.href = SSO_URL;
      }
    });
  }
  throw error;
}
