import React from 'react';
import { Typography } from 'antd';
import { Outlet } from 'react-router-dom';

const { Title } = Typography;

export default function Wrapper() {
  return (
    <Typography>
      <Title>嵌套菜单</Title>
      <Outlet />
    </Typography>
  );
}
