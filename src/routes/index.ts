//Pages
import config from '../config';
import { DefaultLayout } from '../layout/DefaultLayout';
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
];

export { publicRoutes };
