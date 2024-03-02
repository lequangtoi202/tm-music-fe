import { ISong } from '../../types/Song';

interface CarouselProps {
  items: ISong[];
}

interface CarouselItemProps {
  item: ISong;
}

export type { CarouselProps, CarouselItemProps };
