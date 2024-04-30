import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Banner from '../../components/Banner';
import Text from '../../components/Text';
import ThemeContainer from '../../components/Theme';
import { RoundedSkeleton } from '../../components/Skeleton';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Banner/styles';
import { ISong } from '../../types/Song';
import { IAlbum } from '../../types/Album';
import { IGenre } from '../../types/Genre';
import { PlaylistModal } from '../../components/PlaylistModal';
import { getAllAlbums } from '../../services/user';
const theme = createTheme();

function Category() {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAlbums();
      setAlbums(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
  const banner = {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    id: '3',
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>{loading ? <RoundedSkeleton /> : <Banner item={banner} />}</Container>
        <Box sx={{ mt: 3 }}>
          <Text color="black" style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '32px' }}>
            {'Tổng hợp chủ đề'}
          </Text>
          <ThemeContainer items={albums} loading={loading} />
        </Box>
        <PlaylistModal />
      </ThemeProvider>
    </Box>
  );
}

export default Category;
