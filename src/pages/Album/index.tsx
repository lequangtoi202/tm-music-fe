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

function Album() {
  const { albumId } = useParams<{ albumId?: string }>()
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

  useEffect(() => {
    const fetchData = async (id: any) => {
      const data = await getAlbumDetail(id)
      setAlbum(data)
    };

    const fetchDataRelated = async (id: any) => {
      const data = await getAlbumsRelated(id)
      setAlbumRelated(data)
    };

    fetchData(albumId);
    fetchDataRelated(albumId)  
  }, [albumId]);

  const singer: ISinger = {
    image: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    name: 'Hoàng Dũng',
    id: '10',
    description: 'A brief description of Hoàng Dũng',
    birthdate: '1990-01-01',
    songs: [],
    albums: [],
    followed: false,
  };
  const albumData: IAlbum[] = [
    {
      image: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      title: 'Night view',
      id: 3,
      description: 'Description of Night view album',
      songs: [],
      created_at: new Date().toISOString(),
      liked: false,
      owner: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      title: 'Lake view',
      id: 2,
      description: 'Description of Lake view album',
      songs: [],
      created_at: new Date().toISOString(),
      liked: false,
      owner: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: 1,
      description: 'Description of Mountain view album',
      songs: [],
      created_at: new Date().toISOString(),
      liked: false,
      owner: false,
    },
  ];

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlbumDetail />
        <Box style={{ marginTop: '52px' }}>
          <TextHeaderOnly text={'Nghệ Sĩ Tham Gia'} />
          <StyledArtistList>
            {album?.singers.map((singer: any, index: number) => (
              <ArtistInfo item={singer} loading={loading} />
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
