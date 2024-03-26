import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AlbumDetail from '../../components/AlbumDetail';
import ArtistInfo from '../../components/ArtistInfo';
import Text from '../../components/Text';
import { StyledArtistList } from './styles';
import { TextHeader } from '../../components/TextHeader';
import AlbumContainer from '../../components/Album';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
const theme = createTheme();

function Album() {
  const artist = {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    name: 'Hoàng Dũng',
    id: '3',
  };
  const albumData = [
    {
      src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      title: 'Night view',
      id: '3',
    },
    {
      src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      title: 'Lake view',
      id: '2',
    },
    {
      src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
    },
    {
      src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
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
            <ArtistInfo item={artist} />
            <ArtistInfo item={artist} />
            <ArtistInfo item={artist} />
            <ArtistInfo item={artist} />
            <ArtistInfo item={artist} />
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
