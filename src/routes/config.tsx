import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';

import { Page404, To404 } from '@/pages/404';
import { Home } from '@/pages/Home';
import Layouts from '@/layouts';
import { DefaultIndex } from '@/pages/DefaultIndex';

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
    name: '首页',
    path: '/home',
    element: <Home />,
  },
  {
    name: '待办',
    path: '/todos',
    element: <Home />,
  },
  {
    name: '消息',
    path: '/message',
    element: <Home />,
  },
  {
    name: '个人中心',
    path: '/user',
    element: <Home />,
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <DefaultIndex />,
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

export default function RouteConfig() {
  const routeContent = useRoutes(routes);

  return routeContent;
}
