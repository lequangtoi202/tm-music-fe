//Pages
import config from '../config';
import DefaultLayout from '../layout/DefaultLayout/DefaultLayout';
import ArticleComp from '../pages/Article/ArticleComp';
import CategoryComp from '../pages/Category/Category';
import CategoryDetail from '../pages/CategoryDetail/CategoryDetail';
import Home from '../pages/Home/Home';
import BookmarkComp from '../pages/BookmarkComp/BookmarkComp';
import AuthorRequest from '../pages/Author/AuthorRequest';
import Tag from '../pages/Tag/Tag';

//Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.article, component: ArticleComp, layout: DefaultLayout },
  { path: config.routes.category, component: CategoryComp, layout: DefaultLayout },
  { path: config.routes.categoryDetail, component: CategoryDetail, layout: DefaultLayout },
  { path: config.routes.bookmark, component: BookmarkComp, layout: DefaultLayout },
  { path: config.routes.requestAuthor, component: AuthorRequest, layout: DefaultLayout },
  { path: config.routes.tagDetail, component: Tag, layout: DefaultLayout },
];

const privateRoutes: Array<{ path: string; component: React.ReactNode }> = [];

export { publicRoutes, privateRoutes };
