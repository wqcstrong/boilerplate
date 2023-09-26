import { useUserInfo } from '@/store';
import { Layout, Space, Avatar } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import type { PropsWithChildren } from 'react';
import './index.less';

export const Layouts = ({ children }: PropsWithChildren<unknown>) => {
  const username = useUserInfo((state) => state.data.username);

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Header className="layout-header">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="LOGO" className="logo-img" />
        </Link>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <p className="login-user">{username}</p>
        </Space>
      </Header>
      {children}
    </Layout>
  );
};
