import { Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { Container } from '../../components/Banner/styles';
import GenreContainer from '../../components/Genre';
import { PlaylistModal } from '../../components/PlaylistModal';
import { RoundedSkeleton } from '../../components/Skeleton';
import Text from '../../components/Text';
import { banner } from '../../constants';
import { getAlbumsByGenre, getAllGenres } from '../../services/user';
import { IGenre } from '../../types/Genre';
import { TextHeader } from '../../components/TextHeader';
import AlbumContainer from '../../components/Album';
import { IAlbum } from '../../types/Album';
const theme = createTheme();

function Genre() {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const genresMap = new Map<number, IAlbum[]>();
  const fetchData = async () => {
    const response = await getAllGenres(page);
    const data = response?.data ?? [];
    setGenres((prevGenre) => [...prevGenre, ...(data?.genres ?? [])]);
    data?.genres?.forEach(async (genre: IGenre) => {
      const res = await getAlbumsByGenre(genre.id, 1, 1000);
      genresMap.set(genre.id, res?.data?.albums ?? []);
    });
    setTotalPages(data?.total_pages ?? 0);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const handleViewMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <Box mb={10}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>{loading ? <RoundedSkeleton /> : <Banner item={banner} />}</Container>
        <Box sx={{ mt: 3 }}>
          <Text color="black" style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '32px' }}>
            {'Tổng hợp chủ đề'}
          </Text>
          <GenreContainer genres={genres} loading={loading} />
        </Box>
        {page < totalPages && (
          <Box display={'flex'} justifyContent={'center'} mt={3}>
            <Button sx={{ borderRadius: '18px' }} variant="contained" onClick={handleViewMore} component="button">
              Xem thêm
            </Button>
          </Box>
        )}
        {genres.length > 0 &&
          genres.map((genre) => {
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
        <PlaylistModal />
      </ThemeProvider>
    </Box>
  );
}

export default Genre;
