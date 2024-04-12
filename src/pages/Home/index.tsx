import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import AlbumContainer from '../../components/Album';
import CarouselContainer from '../../components/Carousel';
import HistoryContainer from '../../components/History';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { IAlbum } from '../../types/Album';
import { IGenre } from '../../types/Genre';
import { ISong } from '../../types/Song';
import { PlaylistModal } from '../../components/PlaylistModal';
const theme = createTheme();

function Homepage() {
  const [histories, setHistories] = useState<ISong[]>([]);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  const mockGenre: IGenre[] = [
    {
      title: 'Pop',
      id: '1',
      description:
        'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
      songs: [],
      logo: null,
      src: 'https://example.com/pop-genre',
    },
    {
      title: 'Rock',
      id: '2',
      description:
        'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
      songs: [],
      logo: null,
      src: 'https://example.com/pop-genre',
    },
  ];
  const data: ISong[] = [
    {
      id: '3',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2023/07/11/f/e/e/1/1689072251792_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '2',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/03/27/a/a/8/e/1711529602440_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '1',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/03/08/c/8/0/0/1709863624708_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '4',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/01/05/6/8/3/8/1704444239098_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '5',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2023/09/14/d/6/6/b/1694680131219_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '6',
      title: 'Mountain view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/song/2023/12/06/4/e/b/7/1701843103796_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
  ];

  const carousel: ISong[] = [
    {
      id: '3',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712301205774_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '2',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289477854_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '1',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/03/08/c/8/0/0/1709863624708_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '4',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/01/05/6/8/3/8/1704444239098_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '5',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289222145_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '6',
      title: 'Mountain view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289091339_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
  ];
  const albumData: IAlbum[] = [
    {
      logo: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      title: 'Night view',
      id: '3',
      description: 'Description of Night view album',
      songs: carousel,
    },
    {
      logo: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      title: 'Lake view',
      id: '2',
      description: 'Description of Lake view album',
      songs: carousel,
    },
    {
      logo: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
      description: 'Description of Mountain view album',
      songs: carousel,
    },
  ];

  useEffect(() => {
    (async () => {
      // lấy danh sách lịch sử nghe
      //const resHistories = await getHistories();
      setHistories(data);
      // lấy danh sách các albums
      // const resAlbums = await getAllAlbums();
      setAlbums(albumData);
      // LẤY danh sách các genres
      // const resGenres = await getGenres();
      setGenres(mockGenre);
    })();
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ mb: 10 }}>
          <Box>
            <CarouselContainer items={carousel} />
          </Box>
          <Box style={{ marginTop: '52px' }}>
            <TextHeaderOnly text={'Gần Đây'} />
            <HistoryContainer items={histories} />
          </Box>
          {genres.length > 0 &&
            genres.map((genre, idx) => {
              // lấy danh sách các albums theo genre
              return (
                <Box key={genre.id}>
                  <TextHeader text={genre.title} />
                  <AlbumContainer items={albumData} />
                </Box>
              );
            })}
        </Box>
        <PlaylistModal />
      </ThemeProvider>
    </Box>
  );
}

export default Homepage;
