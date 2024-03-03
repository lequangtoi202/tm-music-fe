//Pages
import config from '../config';
import { DefaultLayout } from '../layout/DefaultLayout';
import Album from '../pages/Album';
import Category from '../pages/Category';
import Homepage from '../pages/Home';
//Public routes
const publicRoutes: any = [
  {
    path: config.routes.home,
    component: Homepage,
    layout: DefaultLayout,
  },
  {
    path: config.routes.categories,
    component: Category,
    layout: DefaultLayout,
  },
  {
    path: config.routes.album,
    component: Album,
    layout: DefaultLayout,
  },
];

export { publicRoutes };
