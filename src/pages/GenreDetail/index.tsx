import { Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlbumContainer from '../../components/Album';
import Banner from '../../components/Banner';
import { Container } from '../../components/Banner/styles';
import { PlaylistModal } from '../../components/PlaylistModal';
import { RoundedSkeleton } from '../../components/Skeleton';
import { TextHeader } from '../../components/TextHeader';
import { banner } from '../../constants';
import { getAlbumsByGenre, getGenre } from '../../services/user';
import { IAlbum } from '../../types/Album';
import { IGenre } from '../../types/Genre';
const theme = createTheme();

function GenreDetail() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState<IGenre>();
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { genreId } = useParams<{ genreId?: string }>();
  const fetchData = async () => {
    setLoading(true);
    const genreIdNumber = Number(genreId);
    if (!genreIdNumber) return;
    const data = await getGenre(genreIdNumber);
    setGenre(data);
    const res = await getAlbumsByGenre(Number(genreId), 1, 10);
    if (res?.data) {
      setAlbums((prevAlbums) => [...prevAlbums, ...(res.data?.albums ?? [])]);
      setTotalPages(res.data?.total_pages ?? 0);
    }
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
        <Box>
          {genre && <TextHeader text={genre.title} />}
          <AlbumContainer items={albums} />
        </Box>
        {page < totalPages && (
          <Box display={'flex'} justifyContent={'center'} mt={3}>
            <Button sx={{ borderRadius: '18px' }} variant="contained" onClick={handleViewMore}>
              Xem thêm
            </Button>
          </Box>
        )}
        <PlaylistModal />
      </ThemeProvider>
    </Box>
  );
}

export default GenreDetail;
