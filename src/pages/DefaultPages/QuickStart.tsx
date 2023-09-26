import { Button, message, Space, Typography } from 'antd';
import { useRequest } from 'ahooks';

import { getUserInfo } from '@/apis/user';
import { useUserInfo } from '@/store';

const { Title, Paragraph, Link, Text } = Typography;

const larkVanGroup = 'https://van-api.huolala.work/lala/feishu/join-van-group';
const viteWeb = 'https://vitejs.cn/';
const umiRequest = 'https://github.com/umijs/umi-request';
const ahooksUseRequest = 'https://ahooks.js.org/hooks/async';
const reactRouterUpgrade = 'https://reactrouter.com/docs/en/v6/upgrading/v5';

export const QuickStart = () => {
  const updateUser = useUserInfo((state) => state.updateUser);
  const { run: runRefreshUser } = useRequest(getUserInfo, {
    manual: true,
    onSuccess(res) {
      updateUser(res.data.username);
      message.success('刷新成功，检查右上角用户名');
    },
  });

  return (
    <Typography>
      <Title level={2}>概览</Title>
      <Paragraph>
        <b>react-pc-on-vite</b> 模板（以下简称：react-vite）基于{' '}
        <Link href={viteWeb}>Vite</Link> 构建，Vite
        是一种新的前端构建工具，能够显著提升前端开发体验。
      </Paragraph>

      <Paragraph>
        该模板收拢了项目开发前期所需配置项、并且集成了日常工作高频使用的功能模块，力保开箱即用，以便开发者专注于业务的快速开发。
      </Paragraph>

      <Paragraph>
        当前已经内置的配置有：
        <ul>
          <li>集成发布系统 Van；</li>
          <li>Antd 按需加载；通过 dayjs 替换 moment 优化 Antd 包体积；</li>
          <li>支持使用 less；</li>
          <li>支持引用 svg；</li>
        </ul>
      </Paragraph>

      <Title level={3}>功能模块</Title>
      <Paragraph>
        以下是 react-vite 内置的功能模块：
        <ul>
          <li>基本布局（如你当前所见）</li>
          <li>声明式路由配置</li>
          <li>接口请求</li>
          <li>
            <code>ts/js</code> 混合开发
          </li>
        </ul>
      </Paragraph>

      <Title level={4}>接口请求</Title>
      <Paragraph>
        调用接口功能依赖了两个库：
        <ul>
          <li>
            <Link href={umiRequest}>umi-request</Link>：基于 fetch 封装, 兼具
            fetch 与 axios 的特点；
          </li>
          <li>
            <Link href={ahooksUseRequest}>ahooks/useRequest</Link>
            ：对请求进行封装，是一个强大的管理异步数据请求的 Hook。
          </li>
        </ul>
      </Paragraph>
      <Space>
        <Text>演示：</Text>
        <Button type="primary" onClick={runRefreshUser}>
          刷新当前登录用户
        </Button>
      </Space>

      <Title level={4}>路由和布局</Title>
      <blockquote>
        <Text>
          该模板使用的是 <mark>v6 版本</mark> 的路由，项目迁移时可能会涉及到部分
          API 的调整，点击查看 <Link href={reactRouterUpgrade}>升级文档</Link>。
        </Text>
        <br />
        <Text>
          你也可以通过{' '}
          <code>yarn upgrade react-router@^5.2.0 react-router-dom@^5.2.0</code>{' '}
          使用以往版本。
        </Text>
      </blockquote>
      <Paragraph>
        react-vite 内置了声明式路由， 只需要在{' '}
        <code>src/routes/config.tsx</code>
        中简单配置，就可以实现路由注册、配置侧边栏菜单、隐式路由等功能。
      </Paragraph>

      <Title level={2}>技术支持</Title>
      <Paragraph>
        如需更多帮助，可以点击 <Link href={larkVanGroup}>这里</Link> 加入支持群
      </Paragraph>
    </Typography>
  );
};
