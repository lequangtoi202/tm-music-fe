//Pages
import { lazy } from 'react';
import config from '../config';
import { DefaultLayout } from '../layout/DefaultLayout';
//Public routes
const HomePage = lazy(() => import('../pages/Home'));
const Genre = lazy(() => import('../pages/Genre'));
const GenreDetail = lazy(() => import('../pages/GenreDetail'));
const Album = lazy(() => import('../pages/Album'));
const Account = lazy(() => import('../pages/Account'));
const MyPlaylist = lazy(() => import('../pages/Playlist'));
const MyAlbumDetail = lazy(() => import('../pages/Album'));
const Rooms = lazy(() => import('../pages/Rooms'));
const RoomDetail = lazy(() => import('../pages/RoomDetail'));

const publicRoutes: any = [
  {
    path: config.routes.home,
    component: HomePage,
    layout: DefaultLayout,
  },
  {
    path: config.routes.genre,
    component: Genre,
    layout: DefaultLayout,
  },
  {
    path: config.routes.genreDetail,
    component: GenreDetail,
    layout: DefaultLayout,
  },
  {
    path: config.routes.albums,
    component: Album,
    layout: DefaultLayout,
  },
  {
    path: config.routes.profile,
    component: Account,
    layout: DefaultLayout,
  },
  {
    path: config.routes.myplaylist,
    component: MyPlaylist,
    layout: DefaultLayout,
  },
  {
    path: config.routes.myalbumDetail,
    component: MyAlbumDetail,
    layout: DefaultLayout,
  },
  {
    path: config.routes.rooms,
    component: Rooms,
    layout: DefaultLayout,
  },
  {
    path: config.routes.room,
    component: RoomDetail,
    layout: DefaultLayout,
  },
];

export { publicRoutes };
