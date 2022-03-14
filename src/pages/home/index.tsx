import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

const Home = () => {
  return (
    <Typography>
      <Title level={3}>你好！🤪</Title>

      <Paragraph>
        欢迎使用基于 Vite 构建的 react 项目脚手架，点击
        <Link to="/quick-start">这里</Link>快速阅览一下吧
      </Paragraph>
    </Typography>
  );
};

export default Home;
