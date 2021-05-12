import React, { useContext } from 'react';
import { Button, message, Space, Typography } from 'antd';
import { useRequest } from 'ahooks';

import { getUserInfo } from '../../apis/user.js';
import { UserContext } from '../../contexts';

const { Title, Paragraph, Link, Text } = Typography;

const createUmiProject = 'https://umijs.org/zh-CN';
const reactAppRewired = 'https://github.com/timarney/react-app-rewired';
const customizeCra = 'https://github.com/arackaf/customize-cra';
const umiRequest = 'https://github.com/umijs/umi-request';
const ahooksUseRequest = 'https://ahooks.js.org/hooks/async';

export default function Menu1() {
  const { updateUser } = useContext(UserContext);
  const { run: runRefreshUser } = useRequest(getUserInfo, {
    manual: true,
    onSuccess(res) {
      updateUser(res.data);
      message.success('刷新成功，检查右上角用户名');
    }
  });

  return (
    <Typography>
      <Title level={2}>概览</Title>
      <Paragraph>
        <b>@blucass/react-lite-pc</b>
        （以下简称：react-lite）基于 create-react-app CLI 开发，
        它将日常工作中使用频率高的模块集成到一起形成项目启动模板，现在只需要关心业务代码的编写。
      </Paragraph>

      <Paragraph>
        react-lite 比较轻量，囊括的功能都是业务中不可避免需要用到。
        相对应的，如果您对 <Link href={createUmiProject}>umi</Link>
        比较熟悉，可以拥抱它。
      </Paragraph>

      <Title level={3}>配置</Title>
      <Paragraph>
        基础的CRA项目模板无法满足业务配置，但 react-lite 跳过了
        <code>eject</code> 命令， 通过
        <Link href={reactAppRewired}>react-app-rewired</Link>、
        <Link href={customizeCra}>cutomize-cra</Link> 修改配置。
      </Paragraph>

      <Paragraph>
        当前已经内置的功能配置有：
        <ul>
          <li>支持使用 less；</li>
          <li>通过 dayjs 替换 moment 优化 Antd 包体积；</li>
          <li>……还可以做到更多，告诉我们您的需求。</li>
        </ul>
        如果需要自定义配置或者对当前配置细节比较关心，可以查看
        <code>config-overrides/index.js</code> 了解更多。
      </Paragraph>

      <Title level={3}>功能模块</Title>
      <Paragraph>
        以下是 react-lite 内置的功能模块：
        <ul>
          <li>ts/js 混合开发</li>
          <li>接口请求</li>
          <li>路由配置</li>
          <li>基本布局</li>
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
        <Text mark>
          注意：调用接口务必使用 src/apis/instance/index.ts 中的 request
          实例！！！
        </Text>
      </Paragraph>
      <Space>
        <Text>演示：</Text>
        <Button type='primary' onClick={runRefreshUser}>
          刷新当前登录用户
        </Button>
      </Space>

      <Title level={4}>路由和布局</Title>
      <Paragraph>
        react-lite 基于 react-router 和 react-router-dom 内置了声明式路由，
        只需要在 <code>src/routes/index.tsx</code>
        中简单配置，就可以实现路由注册、配置侧边栏菜单、隐式路由等功能。
      </Paragraph>
    </Typography>
  );
}
