import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { heightCarousel } from '../../constants';
import CarouselItem from './CarouselItem';
import { CarouselProps } from './types';

const CarouselContainer: React.FC<CarouselProps> = ({ items }) => {
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const itemsPerRowDesktop = 3;
  const itemsPerRowMobile = 1;

  useEffect(() => {
    const handleResize = () => {
      setItemsPerRow(window.innerWidth >= 768 ? itemsPerRowDesktop : itemsPerRowMobile);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsPerRowDesktop, itemsPerRowMobile]);

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
    <Container style={{ height: `${heightCarousel}px`, marginTop: '30px' }}>
      <Carousel animation="slide">
        {rows.map((item, index) => (
          <Box height={`${heightCarousel}px`} key={index}>
            {item}
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarouselContainer;
