import React, { useState } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Avatar, Layout, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import type { RouteInfo } from '../routes';
import { baseRoutes } from '../routes';
import Sidebar from './sidebar';
import Page404 from '../404';
import LoadingFallback from './loading-fallback';
import './index.less';
import { UserContext } from '../contexts';

const { Header, Content } = Layout;

function generateRoute(route: RouteInfo, isChildren: boolean = false) {
  if (route.redirectTo) {
    return (
      <Redirect
        key={route.path}
        exact={true}
        from={route.path}
        to={route.redirectTo}
      />
    );
  }
  if (route.children && route.children.length !== 0) {
    const childrenContent = (
      <Switch>
        {route.children.map((child) => generateRoute(child, true))}
        <Redirect path='*' to='/404' />
      </Switch>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        render={() => {
          return <route.component>{childrenContent}</route.component>;
        }}
      />
    );
  }
  return (
    <Route
      key={route.path}
      exact={route.exact || isChildren}
      path={route.path}
      component={route.component}
    />
  );
}

const LayoutContent = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout className='layout-content'>
        <Content>
          <div style={{ height: '100%', padding: 20, overflow: 'auto' }}>
            <div className='page-container'>
              <React.Suspense fallback={<LoadingFallback />}>
                <Switch>
                  {baseRoutes.map((item) => generateRoute(item))}
                  <Redirect exact from='/' to={baseRoutes[0].path} />
                  <Redirect from='*' to='/404' />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default () => {
  const [userInfo, setUserInfo] = useState({
    username: 'admin',
    email: 'xxx@hll.cn'
  });
  const userContextValue = {
    userInfo,
    updateUser(val: any) {
      setUserInfo(val);
    }
  };

  return (
    <Layout style={{ minHeight: '100%' }}>
      <UserContext.Provider value={userContextValue}>
        <Header className='layout-header'>
          <Link to='/'>LOGO</Link>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <p className='login-user'>{userInfo.username}</p>
          </Space>
        </Header>
        <Switch>
          <Route path='/404' component={Page404} />
          <Route path='/' component={LayoutContent} />
        </Switch>
      </UserContext.Provider>
    </Layout>
  );
};
