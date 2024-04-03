import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import AlbumContainer from '../../components/Album';
import AlbumDetail from '../../components/AlbumDetail';
import ArtistInfo from '../../components/ArtistInfo';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { StyledArtistList } from './styles';
import { IAlbum } from '../../types/Album';
import { ISinger } from '../../types/Singer';
const theme = createTheme();

function Album() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
  const singer: ISinger = {
    avatar: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    name: 'Hoàng Dũng',
    id: '3',
    description: 'A brief description of Hoàng Dũng',
    birthDate: '1990-01-01',
    songs: [],
    albums: [],
  };
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
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlbumDetail />
        <div style={{ marginTop: '52px' }}>
          <TextHeaderOnly text={'Nghệ Sĩ Tham Gia'} />
          <StyledArtistList>
            <ArtistInfo item={singer} loading={loading} />
            <ArtistInfo item={singer} loading={loading} />
            <ArtistInfo item={singer} loading={loading} />
            <ArtistInfo item={singer} loading={loading} />
            <ArtistInfo item={singer} loading={loading} />
          </StyledArtistList>
        </div>

        <Box marginBottom={8}>
          <TextHeader text={'Có Thể Bạn Quan Tâm'} />
          <AlbumContainer items={albumData} />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Album;
