import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import GenreContainer from '../../components/MoreGenre';
import GenreDetail from '../../components/GenreDetail';
import ArtistInfo from '../../components/ArtistInfo';
import { PlaylistModal } from '../../components/PlaylistModal';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { IAlbum } from '../../types/Album';
import { ISinger } from '../../types/Singer';
import { StyledArtistList } from './styles';
import { getAlbumDetail, getAlbumsRelated, getGenre, getGenresRelated } from '../../services/user';
import { useParams } from 'react-router-dom';
const theme = createTheme();
type ReCallApiFunction = () => void;

function Genre() {
  const { genreId } = useParams<{ genreId?: string }>()
  
  const [genre, setGenre] = useState<any>(null);
  const [genresRelated, setGenresRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchDataGenre = async (id: any) => {
    const data = await getGenre(id)
    setGenre(data)
  };

  const fetchDataGenreRelated = async (id: any) => {
    const data = await getGenresRelated(id)
    setGenresRelated(data)
  };

  useEffect(() => {
    fetchDataGenre(genreId)
    fetchDataGenreRelated(genreId)
  }, [genreId]);


  const reCallApi: ReCallApiFunction = () => {
    fetchDataGenre(genreId);
  }

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GenreDetail />
        <Box style={{ marginTop: '52px' }}>
          <TextHeaderOnly text={'Nghệ Sĩ Tham Gia'} />
          <StyledArtistList>
            {genre?.singers.map((singer: any, index: number) => (
              <ArtistInfo item={singer} loading={loading} reCallApi={reCallApi} />
            ))}
          </StyledArtistList>
        </Box>

        <Box marginBottom={8}>
          <TextHeader text={'Có Thể Bạn Quan Tâm'} />
          <GenreContainer items={genresRelated} />
        </Box>

        <PlaylistModal />
      </ThemeProvider>
    </Box>
  );
}

export default Genre;
