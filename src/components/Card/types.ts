import { IAlbum } from '../../types/Album';

interface CardItemProps {
  item: IAlbum | null;
}

interface CardItemsProps {
  items?: IAlbum[];
}

export type { CardItemProps, CardItemsProps };
