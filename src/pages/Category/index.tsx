import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AlbumContainer from '../../components/Album';
import CarouselContainer from '../../components/Carousel';
import HistoryContainer from '../../components/History';
import Text from '../../components/Text';
import { TextHeader } from '../../components/TextHeader';
import Banner from '../../components/Banner';
const theme = createTheme();

function Category() {
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

  const banner = {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    id: '3',
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* banner */}
        <div>
          <Banner item={banner} />
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
    </div>
  );
}

export default Category;
