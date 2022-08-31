import { Toast } from 'antd-mobile';
import type { ResponseError } from 'umi-request';

const SSO_URL = '';

export default function errorHandler(error: ResponseError) {
  const { status } = error.response;
  if (status === 401) {
    Toast.show({
      icon: 'fail',
      content: '登录过期',
      duration: 1500,
      maskClickable: false,
      afterClose() {
        if (SSO_URL) {
          window.location.href = SSO_URL;
        }
      },
    });
  }
  throw error;
}
