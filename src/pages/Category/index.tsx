import { Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { Container } from '../../components/Banner/styles';
import { PlaylistModal } from '../../components/PlaylistModal';
import { RoundedSkeleton } from '../../components/Skeleton';
import Text from '../../components/Text';
import ThemeContainer from '../../components/Theme';
import { getAllAlbums } from '../../services/user';
import { IAlbum } from '../../types/Album';
const theme = createTheme();

function Category() {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchData = async () => {
    const response = await getAllAlbums(page);
    const data = response?.data;
    setAlbums(data?.albums ?? []);
    setTotalPages(data?.totalPages ?? 0);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchData();
    }
  };
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
      {page < totalPages && (
        <Box display={'flex'} justifyContent={'center'} mt={3}>
          <Button sx={{ borderRadius: '18px' }} variant="contained" onClick={handleViewMore} component="button">
            Xem thêm
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Category;
