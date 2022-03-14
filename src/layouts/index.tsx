import { UserContext } from '@/contexts';
import { Layout, Space, Avatar } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import './index.less';

const Layouts = ({ children }: PropsWithChildren<unknown>) => {
  const [userInfo, setUserInfo] = useState({
    username: 'admin',
    email: 'xxx@yyy.cn',
  });
  const userContextValue = {
    userInfo,
    updateUser(val: any) {
      setUserInfo(val);
    },
  };
  return (
    <Layout style={{ minHeight: '100%' }}>
      <UserContext.Provider value={userContextValue}>
        <Header className="layout-header">
          <Link to="/">
            <img src="/logo.svg" alt="LOGO" className="logo" />
          </Link>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <p className="login-user">{userInfo.username}</p>
          </Space>
        </Header>
        {children}
      </UserContext.Provider>
    </Layout>
  );
};

export default Layouts;
