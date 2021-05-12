import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Wrapper(props: any) {
  return (
    <Typography>
      <Title>嵌套菜单</Title>
      {props.children}
    </Typography>
  );
}
