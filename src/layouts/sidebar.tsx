import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { siderRoutes } from '@/routes';
import type { SiderRoute } from '@/routes';
import { StorageUtil } from '@/utils';
import React from 'react';

const { Sider } = Layout;

const menuKeys: Set<string> = new Set();
function computeMenus(routes: SiderRoute[]) {
  const result: MenuProps['items'] = [];
  for (const item of routes) {
    const { path, name, hidden, children, icon = null } = item;
    if (path) {
      menuKeys.add(path);
    }
    if (hidden) continue;
    const menuIcon = icon && React.createElement(icon);
    if (children?.length) {
      const childrenRoutes = computeMenus(children);
      result.push({
        key: path!,
        label: name,
        title: name,
        icon: menuIcon,
        children: childrenRoutes,
      });
    } else {
      result.push({
        key: path!,
        label: <Link to={path ?? '/'}>{name}</Link>,
        title: name,
        icon: menuIcon,
      });
    }
  }
  return result;
}

const Sidebar = () => {
  const { pathname } = useLocation();
  const openKeys = useMemo(() => {
    return [`/${pathname.split('/')[1]}`];
  }, [pathname]);
  const [selectedKeys, setSelectedKeys] = useState(openKeys);
  useEffect(() => {
    if (!menuKeys.has(pathname)) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys([pathname]);
    }
  }, [pathname]);

  const menuItems = useMemo(() => {
    const result = computeMenus(siderRoutes);
    return result;
  }, []);

  const COLLAPSED_IDENTIFIER = 'sidebar-collapsed';
  const defaultCollapsed = StorageUtil.getOrigin(COLLAPSED_IDENTIFIER) === '1';
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  useEffect(() => {
    StorageUtil.set(COLLAPSED_IDENTIFIER, Number(collapsed));
  }, [collapsed]);

  return (
    <Sider collapsible collapsed={collapsed} trigger={null} breakpoint="sm">
      <div className="layout-sidebar">
        <Menu
          defaultOpenKeys={openKeys}
          mode="inline"
          theme="dark"
          selectedKeys={selectedKeys}
          items={menuItems}
        />
        <p
          className="sidebar-controller"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed === true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </p>
      </div>
    </Sider>
  );
};

export default Sidebar;
