import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Container } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from './CarouselItem';
import { StyledBoxInner } from './styles';
import { CarouselProps } from './types';

const CarouselContainer: React.FC<CarouselProps> = ({ items }) => {
  return (
    <Container style={{ height: `32vh`, marginTop: '30px' }}>
      <StyledBoxInner>
        <Carousel
          style={{ height: '32vh', textAlign: 'center' }}
          prevLabel=""
          nextLabel=""
          nextIcon={<ArrowForwardIos />}
          prevIcon={<ArrowBackIos />}
        >
          {items.map((item, index) => (
            <Carousel.Item style={{ height: '32vh', borderRadius: '10px' }} key={index}>
              <CarouselItem item={item} />
            </Carousel.Item>
          ))}
        </Carousel>
      </StyledBoxInner>
    </Container>
  );
};

export default CarouselContainer;
