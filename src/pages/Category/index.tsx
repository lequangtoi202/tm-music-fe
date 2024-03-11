import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Banner from '../../components/Banner';
import Text from '../../components/Text';
import ThemeContainer from '../../components/Theme';
import { RoundedSkeleton } from '../../components/Skeleton';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Banner/styles';
const theme = createTheme();

function Category() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
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
          <ThemeContainer items={data} loading={loading} />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default Category;
