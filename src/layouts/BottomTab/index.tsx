import React from 'react';
import { Badge, TabBar } from 'antd-mobile';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomTab = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      key: '/home',
      title: '首页',

      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/todos',
      title: '待办',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: '/message',
      title: '消息',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: '/user',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ];

  return (
    <TabBar
      activeKey={pathname}
      onChange={(val) => {
        navigate(val);
      }}
    >
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default BottomTab;
