import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import AlbumContainer from '../../components/Album';
import CarouselContainer from '../../components/Carousel';
import HistoryContainer from '../../components/History';
import { PlaylistModal } from '../../components/PlaylistModal';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { getAlbumsByGenre, getAllGenres, getHistories, suggestSongs } from '../../services/user';
import { IAlbum } from '../../types/Album';
import { IGenre } from '../../types/Genre';
import { ISong } from '../../types/Song';
const theme = createTheme();

function Homepage() {
  const [histories, setHistories] = useState<ISong[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [page, setPage] = useState<number>(1);
  const [suggests, setSuggests] = useState<ISong[]>([]);
  const [genresMap, setGenresMap] = useState<Map<number, IAlbum[]>>(new Map());
  const mockGenre: IGenre[] = [
    {
      title: 'Pop',
      id: 1,
      description:
        'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
      songs: [],
      image: 'https://example.com/pop-genre',
    },
    {
      title: 'Rock',
      id: 2,
      description:
        'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
      songs: [],
      image: 'https://example.com/pop-genre',
    },
  ];

  const carousel: ISong[] = [
    {
      id: 3,
      title: 'Night view',
      lyric: 'Lyrics of the song',
      release_date: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      image: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712301205774_org.jpg',
      audio: 'path/to/song/audio.mp3',
      genre: mockGenre[0],
      liked: false,
      singers: [],
      owner: false,
    },
    {
      id: 2,
      title: 'Night view',
      lyric: 'Lyrics of the song',
      release_date: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      image: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289477854_org.jpg',
      audio: 'path/to/song/audio.mp3',
      genre: mockGenre[0],
      liked: false,
      singers: [],
      owner: false,
    },
    {
      id: 1,
      title: 'Night view',
      lyric: 'Lyrics of the song',
      release_date: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      image: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/03/08/c/8/0/0/1709863624708_300.jpg',
      audio: 'path/to/song/audio.mp3',
      genre: mockGenre[0],
      liked: false,
      singers: [],
      owner: false,
    },
    {
      id: 4,
      title: 'Night view',
      lyric: 'Lyrics of the song',
      release_date: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      image: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/01/05/6/8/3/8/1704444239098_300.jpg',
      audio: 'path/to/song/audio.mp3',
      genre: mockGenre[0],
      liked: false,
      singers: [],
      owner: false,
    },
    {
      id: 5,
      title: 'Night view',
      lyric: 'Lyrics of the song',
      release_date: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      image: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289222145_org.jpg',
      audio: 'path/to/song/audio.mp3',
      genre: mockGenre[0],
      liked: false,
      singers: [],
      owner: false,
    },
    {
      id: 6,
      title: 'Mountain view',
      lyric: 'Lyrics of the song',
      release_date: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      image: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289091339_org.jpg',
      audio: 'path/to/song/audio.mp3',
      genre: mockGenre[0],
      liked: false,
      singers: [],
      owner: false,
    },
  ];
  useEffect(() => {
    (async () => {
      const resHistories = await getHistories(page);
      const histories = resHistories?.data?.histories ?? [];
      const uniqueHistories = Array.from(new Set(histories.map((history: ISong) => history.id)));
      setHistories(
        uniqueHistories.map((id) => histories.find((history: ISong) => history.id === id)).slice(0, 6) ?? [],
      );
      const resGenres = await getAllGenres(page);
      const genresData = resGenres?.data?.genres ?? [];
      setGenres(genresData);
      const data = (await suggestSongs()) ?? [];
      setSuggests(data.slice(0, 6));
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const newGenresMap = new Map(genresMap);
      for (const genre of genres) {
        const res = await getAlbumsByGenre(genre.id, 1, 1000);
        newGenresMap.set(genre.id, res?.data ?? []);
      }
      setGenresMap(newGenresMap);
    })();
  }, [genres]);

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
          <Box style={{ marginTop: '52px' }}>
            <TextHeaderOnly text={'Đề xuất'} />
            <HistoryContainer items={suggests} />
          </Box>
          {genres.map((genre) => {
            const albumItems = genresMap.get(genre.id) ?? [];
            if (!albumItems || albumItems.length === 0) {
              return null;
            }
            return (
              <Box key={genre.id}>
                <TextHeader text={genre.title} />
                <AlbumContainer items={albumItems} />
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
