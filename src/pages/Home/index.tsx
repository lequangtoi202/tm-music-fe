import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AlbumContainer from '../../components/Album';
import CarouselContainer from '../../components/Carousel';
import HistoryContainer from '../../components/History';
import { PlaylistModal } from '../../components/PlaylistModal';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { getAlbumsByGenre, getAllGenres, getHistories, getSuggestSongsName, suggestSongs } from '../../services/user';
import { IAlbum } from '../../types/Album';
import { IGenre } from '../../types/Genre';
import { ISong } from '../../types/Song';
import { getCurrentUser, getTempCurrentAlbum, getTempCurrentSong } from '../../utils/storage';
import { KContext } from '../../context';
const theme = createTheme();

function Homepage() {
  const { setCurrentUser, setCurrentSong, setCurrentAlbum } = useContext(KContext);
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
      image: 'https://photo-zmp3.zmdcdn.me/cover/8/f/9/3/8f932ff8c944a109b38826ff33c3fe70.jpg',
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
      image: 'https://photo-zmp3.zmdcdn.me/cover/f/d/9/0/fd90bd3fabed951f29062bd0e5743078.jpg',
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
      image: 'https://photo-zmp3.zmdcdn.me/cover/c/f/a/1/cfa177efa79f8a191a8e20c82e558df6.jpg',
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
    const localUser = getCurrentUser();
    const localSong = getTempCurrentSong();
    const localAlbum = getTempCurrentAlbum();
    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
      setCurrentSong(localSong ? JSON.parse(localSong) : null);
      setCurrentAlbum(localAlbum ? JSON.parse(localAlbum) : null);
    }
  }, []);
  useEffect(() => {
    (async () => {
      const resHistories = await getHistories(page);
      const histories = resHistories?.data?.histories ?? [];
      const uniqueHistories = Array.from(new Set(histories.map((history: ISong) => history.id)));
      const historiesSongName = uniqueHistories
        ?.map((id) => histories.find((history: ISong) => history.id === id))
        .map((song) => song?.title ?? '');
      setHistories(
        uniqueHistories.map((id) => histories.find((history: ISong) => history.id === id)).slice(0, 6) ?? [],
      );
      const resGenres = await getAllGenres(page);
      const genresData = resGenres?.data?.genres ?? [];
      setGenres(genresData);
      const resData = await getSuggestSongsName(historiesSongName);
      const data = (await suggestSongs(JSON.stringify(historiesSongName) ?? [])) ?? [];
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
                <TextHeader text={genre.title} to={`/genres/${genre.id}`} />
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
