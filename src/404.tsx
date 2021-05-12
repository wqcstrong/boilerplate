import React from 'react';
import type { RouteComponentProps } from 'react-router';
import { Result, Button } from 'antd';

export default ({ history }: RouteComponentProps) => (
  <Result
    status='404'
    title='404'
    subTitle='对不起，您找的页面不存在！'
    extra={
      <Button
        type='primary'
        onClick={() => {
          history.push('/');
        }}
      >
        返回首页
      </Button>
    }
  />
);
