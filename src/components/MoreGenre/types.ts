import { IAlbum } from '../../types/Album';

interface AlbumItemProps {
  item: IAlbum;
  loading: boolean;
}

interface AlbumItemsProps {
  items: IAlbum[];
}

export type { AlbumItemProps, AlbumItemsProps };
