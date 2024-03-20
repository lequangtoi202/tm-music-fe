import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AlbumContainer from '../../components/Album';
import CarouselContainer from '../../components/Carousel';
import HistoryContainer from '../../components/History';
import Text from '../../components/Text';
import { TextHeader } from '../../components/TextHeader';
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
        <div>
          <CarouselContainer items={data} />
        </div>

        <div style={{ marginTop: '80px' }}>
          <Text color="black" style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '32px' }}>
            {'Gần đây'}
          </Text>
          <HistoryContainer items={data} />
        </div>
        <div>
          <TextHeader text={'Chill'} />
          <AlbumContainer items={albumData} />
        </div>
        <div>
          <TextHeader text={'Tâm Trạng Tan Chậm'} />
          <AlbumContainer items={albumData} />
        </div>
        <div>
          <TextHeader text={'Hot'} />
          <AlbumContainer items={albumData} />
        </div>
      </ThemeProvider>
    </Box>
  );
}

export default Homepage;
