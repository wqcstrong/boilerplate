import { useParams, Link } from 'react-router-dom';
import { Typography } from 'antd';

import './index.less';

const { Title, Paragraph } = Typography;

export default function Article() {
  const params = useParams();
  return (
    <div className='article'>
      <div className='content'>
        <Title>Article Page</Title>
        <Paragraph>Current id is {params.id}</Paragraph>
        <Link
          to={'/'}
          style={{
            color: '#1677ff'
          }}
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
