import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import {
  AreaChartOutlined,
  ChromeOutlined,
  ForkOutlined,
} from '@ant-design/icons';

import { Page404, To404 } from '@/404';
import Home from '@/pages/home';
import DefaultMenu from '@/pages/default-menu';
import HiddenMenu from '@/pages/hidden-menu';
import WrapperMenu from '@/pages/wrapper-menu';
import InnerMenu from '@/pages/wrapper-menu/detail';
import React from 'react';
import { LayoutContent } from '@/layouts/content';

const LazyLoadMenu = React.lazy(() => import('@/pages/lazy-menu'));

export interface RouteInfo {
  icon?: any;
  name: string;
  hidden?: boolean;
  children?: (RouteInfo & RouteObject)[];
  redirectTo?: string;
}

export type SiderRoute = RouteInfo & RouteObject;

export const siderRoutes: SiderRoute[] = [
  {
    icon: AreaChartOutlined,
    name: '快速上手',
    path: '/quick-start',
    element: <DefaultMenu />,
  },
  {
    icon: ForkOutlined,
    name: '懒加载路由',
    path: '/lazy-load',
    element: <LazyLoadMenu />,
  },
  {
    name: '隐藏菜单',
    path: '/hidden-menu',
    hidden: true,
    element: <HiddenMenu />,
  },
  {
    icon: ChromeOutlined,
    name: '嵌套菜单',
    path: '/nest-menu',
    element: <WrapperMenu />,
    children: [
      {
        name: '内部菜单',
        path: '/nest-menu/detail-1',
        element: <InnerMenu />,
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutContent />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      ...siderRoutes,
      {
        path: '*',
        element: <To404 />,
      },
    ],
  },
  {
    path: '/404',
    element: <Page404 />,
  },
];

export default function App() {
  const routeContent = useRoutes(routes);

  return routeContent;
}
