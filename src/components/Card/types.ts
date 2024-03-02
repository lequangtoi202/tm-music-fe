import { ISong } from '../../types/Song';

interface CardItemProps {
  item: ISong;
}

interface CardItemsProps {
  items: ISong[];
}

export type { CardItemProps, CardItemsProps };
