import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import LoadingFallback from './loading-fallback';
import Sidebar from './sidebar';

const { Content } = Layout;

export const LayoutContent = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout className="layout-content">
        <Content>
          <div style={{ height: '100%', padding: 20, overflow: 'auto' }}>
            <div className="page-container">
              <React.Suspense fallback={<LoadingFallback />}>
                <Outlet />
              </React.Suspense>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
