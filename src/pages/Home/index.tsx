import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useContext } from 'react';
import AlbumContainer from '../../components/Album';
import CarouselContainer from '../../components/Carousel';
import HistoryContainer from '../../components/History';
import { TextHeader } from '../../components/TextHeader';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { KContext } from '../../context';
const theme = createTheme();

function Homepage() {
  const { isMobile } = useContext(KContext);
  const data = [
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
  ];
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
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </Box>
  );
}

export default Homepage;
