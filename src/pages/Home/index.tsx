import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AlbumContainer from '../../components/Album';
import CarouselContainer from '../../components/Carousel';
import HistoryContainer from '../../components/History';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { IGenre } from '../../types/Genre';
import { IAlbum } from '../../types/Album';
import { ISong } from '../../types/Song';
const theme = createTheme();

function Homepage() {
  const mockGenre: IGenre = {
    title: 'Pop',
    id: '1',
    description:
      'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
    songs: [],
    logo: null,
    src: 'https://example.com/pop-genre',
  };
  const data: ISong[] = [
    {
      id: '3',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      file: 'path/to/song/file.mp3',
      genre: mockGenre,
    },
    {
      id: '2',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      file: 'path/to/song/file.mp3',
      genre: mockGenre,
    },
    {
      id: '1',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      file: 'path/to/song/file.mp3',
      genre: mockGenre,
    },
    {
      id: '4',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      file: 'path/to/song/file.mp3',
      genre: mockGenre,
    },
    {
      id: '5',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      file: 'path/to/song/file.mp3',
      genre: mockGenre,
    },
    {
      id: '6',
      title: 'Mountain view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      file: 'path/to/song/file.mp3',
      genre: mockGenre,
    },
  ];
  const albumData: IAlbum[] = [
    {
      logo: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      title: 'Night view',
      id: '3',
      description: 'Description of Night view album',
      songs: [],
    },
    {
      logo: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      title: 'Lake view',
      id: '2',
      description: 'Description of Lake view album',
      songs: [],
    },
    {
      logo: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
      description: 'Description of Mountain view album',
      songs: [],
    },
  ];

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ mb: 10 }}>
          <Box>
            <CarouselContainer items={data} />
          </Box>
          <Box style={{ marginTop: '52px' }}>
            <TextHeaderOnly text={'Gần Đây'} />
            <HistoryContainer items={data} />
          </Box>
          <Box>
            <TextHeader text={'Chill'} />
            <AlbumContainer items={albumData} />
          </Box>
          <Box>
            <TextHeader text={'Tâm Trạng Tan Chậm'} />
            <AlbumContainer items={albumData} />
          </Box>
          <Box>
            <TextHeader text={'Hot'} />
            <AlbumContainer items={albumData} />
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default Homepage;
