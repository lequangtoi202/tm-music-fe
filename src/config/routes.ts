const routes: { [key: string]: string } = {
  home: '/',
  categories: '/chu-de',
  albums: '/albums/:albumId',
  account: '/ho-so',
  myplaylist: '/mymusic/playlist',
  myalbumDetail: '/mymusic/albums/:albumId',
  rooms: '/rooms',
  room: '/rooms/:uuid'
};

export default routes;
