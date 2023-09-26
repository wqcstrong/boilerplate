import { Typography } from 'antd';
import { Outlet } from 'react-router-dom';

const { Title } = Typography;

export const WrapperMenu = () => {
  return (
    <Typography>
      <Title>嵌套菜单</Title>
      <Outlet />
    </Typography>
  );
};
