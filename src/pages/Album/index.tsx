import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import AlbumContainer from '../../components/Album';
import AlbumDetail from '../../components/AlbumDetail';
import ArtistInfo from '../../components/ArtistInfo';
import { PlaylistModal } from '../../components/PlaylistModal';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { IAlbum } from '../../types/Album';
import { ISinger } from '../../types/Singer';
import { StyledArtistList } from './styles';
import { getAlbumDetail, getAlbumsRelated } from '../../services/user';
import { useParams } from 'react-router-dom';
const theme = createTheme();
type ReCallApiFunction = () => void;

function Album() {
  const { albumId } = useParams<{ albumId?: string }>();
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [albumRelated, setAlbumRelated] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchData = async (id: any) => {
    const data = await getAlbumDetail(id);
    setAlbum(data);
  };

  const fetchDataRelated = async (id: any) => {
    const data = await getAlbumsRelated(id);
    setAlbumRelated(data);
  };

  useEffect(() => {
    fetchData(albumId);
    fetchDataRelated(albumId);
  }, [albumId]);

  const reCallApi: ReCallApiFunction = () => {
    fetchData(albumId);
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlbumDetail />
        <Box style={{ marginTop: '52px' }}>
          <TextHeaderOnly text={'Nghệ Sĩ Tham Gia'} />
          <StyledArtistList>
            {album?.singers.map((singer: ISinger) => (
              <ArtistInfo key={singer.id} item={singer} loading={loading} reCallApi={reCallApi} />
            ))}
          </StyledArtistList>
        </Box>

        <Box marginBottom={8}>
          <TextHeader text={'Có Thể Bạn Quan Tâm'} />
          <AlbumContainer items={albumRelated} />
        </Box>

        <PlaylistModal />
      </ThemeProvider>
    </Box>
  );
}

export default Album;
