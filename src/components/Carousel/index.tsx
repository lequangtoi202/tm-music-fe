import { Container } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { heightCarousel } from '../../constants';
import { CarouselProps } from './types';
import CarouselItem from './CarouselItem';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const CarouselContainer: React.FC<CarouselProps> = ({ items }) => {
  return (
    <Container style={{ height: `${heightCarousel}px`, marginTop: '30px' }}>
      <Carousel
        style={{ height: '24vh', textAlign: 'center' }}
        prevLabel=""
        nextLabel=""
        nextIcon={<ArrowForwardIos />}
        prevIcon={<ArrowBackIos />}
      >
        {items.map((item, index) => (
          <Carousel.Item style={{ height: '24vh' }} key={index}>
            <CarouselItem item={item} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarouselContainer;
