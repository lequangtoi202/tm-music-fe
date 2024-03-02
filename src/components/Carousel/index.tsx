import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CarouselProps } from './types';
import CarouselItem from './CarouselItem';
import Carousel from 'react-material-ui-carousel';

const CarouselContainer: React.FC<CarouselProps> = ({ items }) => {
  const itemsPerRow = 3;

  const rows: React.ReactNode[] = [];

  for (let i = 0; i < items.length; i += itemsPerRow) {
    const rowItems = items.slice(i, i + itemsPerRow);
    const row = (
      <Box
        key={i}
        display="flex"
        justifyContent="space-between"
        style={{ cursor: 'pointer' }}
        marginBottom="16px"
        height={'100%'}
        gap={'38px'}
      >
        {rowItems.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Box>
    );
    rows.push(row);
  }
  return (
    <Container style={{ height: '30vh', marginTop: '30px' }}>
      <Carousel animation="slide">
        {rows.map((item, index) => (
          <Box height={'30vh'} key={index}>
            {item}
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarouselContainer;
