import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { baseRoutes } from '../routes';
import type { RouteInfo } from '../routes';
import { StorageUtil } from '../utils';

const { Sider } = Layout;
const { SubMenu } = Menu;

const menuKeys: string[] = [];
function generateMenu(route: RouteInfo) {
  menuKeys.push(route.path);
  if (route.hidden === true) {
    return null;
  }
  if (route.children && route.children.length !== 0) {
    const childrenMenus = route.children.map((item) => generateMenu(item));
    return (
      <SubMenu key={route.path} icon={<route.icon />} title={route.name}>
        {childrenMenus}
      </SubMenu>
    );
  }
  return (
    <Menu.Item key={route.path} icon={route.icon && <route.icon />}>
      <Link to={route.path}>{route.name}</Link>
    </Menu.Item>
  );
}

const Sidebar = () => {
  const { pathname } = useLocation();
  const openKey = `/${pathname.split('/')[1]}`;
  const [selectedKeys, setSelectedKeys] = useState([openKey]);
  useEffect(() => {
    if (menuKeys.indexOf(pathname) === -1) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys([pathname]);
    }
  }, [pathname]);

  const COLLAPSED_IDENTIFIER = 'sidebar-collapsed';
  const defaultCollapsed = StorageUtil.getOrigin(COLLAPSED_IDENTIFIER) === '1';
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  useEffect(() => {
    StorageUtil.set(COLLAPSED_IDENTIFIER, +collapsed);
  }, [collapsed]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      breakpoint='sm'
      onBreakpoint={setCollapsed}
    >
      <div className='layout-sidebar'>
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode='inline'
          theme='dark'
          selectedKeys={selectedKeys}
        >
          {baseRoutes.map((route) => generateMenu(route))}
        </Menu>
        <p
          className='sidebar-controller'
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed === true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </p>
      </div>
    </Sider>
  );
};

export default Sidebar;
