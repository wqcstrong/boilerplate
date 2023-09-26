import { DotLoading } from 'antd-mobile';

export default function LoadingFallback() {
  return (
    <div style={{ textAlign: 'center' }}>
      <DotLoading style={{ marginTop: 50 }} />
    </div>
  );
}
