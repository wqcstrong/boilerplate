import { Result, Space } from 'antd-mobile';
import { Link, Navigate } from 'react-router-dom';

export const To404 = () => <Navigate to="/404" replace />;

export const Page404 = () => (
  <Result
    status="warning"
    title="404"
    description={
      <Space direction="vertical">
        <span style={{ textAlign: 'center' }}>
          对不起，您访问的页面不存在！
        </span>
        <Link to="/">返回首页</Link>
      </Space>
    }
  />
);
