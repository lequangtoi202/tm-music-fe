//Pages
import { lazy } from 'react';
import config from '../config';
import { DefaultLayout } from '../layout/DefaultLayout';
//Public routes
const HomePage = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Album = lazy(() => import('../pages/Album'));
const Account = lazy(() => import('../pages/Account'));
const MyPlaylist = lazy(() => import('../pages/Playlist'));

const publicRoutes: any = [
  {
    path: config.routes.home,
    component: HomePage,
    layout: DefaultLayout,
  },
  {
    path: config.routes.categories,
    component: Category,
    layout: DefaultLayout,
  },
  {
    path: config.routes.albums,
    component: Album,
    layout: DefaultLayout,
  },
  {
    path: config.routes.account,
    component: Account,
    layout: DefaultLayout,
  },
  {
    path: config.routes.myplaylist,
    component: MyPlaylist,
    layout: DefaultLayout,
  },
];

export { publicRoutes };
