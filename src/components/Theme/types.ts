import { IAlbum } from '../../types/Album';

interface ThemeItemProps {
  item: IAlbum;
  loading: boolean;
}

interface ThemeItemsProps {
  items: IAlbum[];
  loading: boolean;
}

export type { ThemeItemProps, ThemeItemsProps };
