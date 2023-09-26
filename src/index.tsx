import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Alert, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import 'antd/dist/reset.css';

import './index.css';

const { ErrorBoundary } = Alert;
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        {/* 如果不需要 ErrorBoundary 可以去掉 */}
        <ErrorBoundary message='Oops! Something went wrong!'>
          <App />
        </ErrorBoundary>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
