import { Spin } from 'antd';

export default function LoadingFallback() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin style={{ marginTop: 50 }} />
    </div>
  );
}
