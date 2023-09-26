import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import {
  AreaChartOutlined,
  ChromeOutlined,
  ForkOutlined,
} from '@ant-design/icons';

import { Page404, To404 } from '@/404';
import { Home } from '@/pages/DefaultPages/Home';
import { QuickStart } from '@/pages/DefaultPages/QuickStart';
import { HiddenMenu } from '@/pages/DefaultPages/Hidden';
import { WrapperMenu } from '@/pages/DefaultPages/Wrapper';
import { InnerMenu } from '@/pages/DefaultPages/WrapperDetail';
import React from 'react';
import { LayoutContent } from '@/layouts/content';

const LazyLoadMenu = React.lazy(() => import('@/pages/DefaultPages/Lazy'));

export interface RouteInfo {
  icon?: any;
  name: string;
  hidden?: boolean;
  children?: (RouteInfo & RouteObject)[];
  redirectTo?: string;
}

export type SiderRoute = RouteInfo & RouteObject;

export const siderRoutes = [
  {
    icon: AreaChartOutlined,
    name: '快速上手',
    path: '/quick-start',
    element: <QuickStart />,
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
    element: <WrapperMenu />,
    path: '/nest-menu',
    children: [
      {
        name: '内部菜单',
        path: '/nest-menu/detail-1',
        element: <InnerMenu />,
      },
    ],
  },
] as SiderRoute[];

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

const RouteConfig = () => {
  const routeContent = useRoutes(routes);

  return routeContent;
};

export default RouteConfig;
