import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Container } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from './CarouselItem';
import { CarouselProps } from './types';

const CarouselContainer: React.FC<CarouselProps> = ({ items }) => {
  return (
    <Container style={{ height: `24vh`, marginTop: '30px' }}>
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
