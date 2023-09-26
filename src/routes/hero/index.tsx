import { Button, Space, Typography } from 'antd';
import heroImg from '../../assets/hero.png';
import { useNavigate } from 'react-router-dom';
import './index.less';

const { Title, Paragraph } = Typography;

export default function Hero() {
  const nav = useNavigate();
  return (
    <div className='hero'>
      <img src={heroImg} alt='hero' />
      <Title level={2}>React PC Boilerplate</Title>
      <Title level={5}> A react boilerplate for Van</Title>
      <Paragraph>
        React router, antd, axios, ahooks had been installed
      </Paragraph>
      <Space>
        <Button type='primary'>Getting Started</Button>
        <Button
          onClick={() => {
            nav('/article/1');
          }}
        >
          Navigate
        </Button>
      </Space>
    </div>
  );
}
