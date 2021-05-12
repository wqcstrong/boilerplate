import React from 'react';
import {
  AreaChartOutlined,
  ChromeOutlined,
  ForkOutlined
} from '@ant-design/icons';

import DefaultMenu from '../pages/default-menu';
import HiddenMenu from '../pages/hidden-menu';
import WrapperMenu from '../pages/wrapper-menu';
import InnerMenu from '../pages/wrapper-menu/detail';

export interface RouteInfo {
  icon?: any;
  name: string;
  path: string;
  hidden?: boolean;
  children?: RouteInfo[];
  redirectTo?: string;
  exact?: boolean;
  component?: any;
}

const baseRoutes: RouteInfo[] = [
  {
    icon: AreaChartOutlined,
    name: '快速上手',
    path: '/menu-1',
    component: DefaultMenu
  },
  {
    icon: ForkOutlined,
    name: '懒加载路由',
    path: '/lazy-load',
    component: React.lazy(
      () => import(/* webpackChunkName: 'lazy-load' */ '../pages/lazy-menu')
    )
  },
  {
    name: '隐藏菜单',
    path: '/menu-2',
    hidden: true,
    component: HiddenMenu
  },
  {
    icon: ChromeOutlined,
    name: '嵌套菜单',
    path: '/menu-3',
    component: WrapperMenu,
    children: [
      {
        name: '内部菜单',
        path: '/menu-3/detail-1',
        component: InnerMenu
      }
    ]
  }
];

export { baseRoutes };
