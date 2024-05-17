const routes: { [key: string]: string } = {
  home: '/',
  genre: '/genres',
  genreDetail: '/genres/:genreId',
  albums: '/albums/:albumId',
  profile: '/profile',
  myplaylist: '/mymusic/playlist',
  myalbumDetail: '/mymusic/albums/:albumId',
  rooms: '/rooms',
  room: '/rooms/:uuid',
};

export default routes;
