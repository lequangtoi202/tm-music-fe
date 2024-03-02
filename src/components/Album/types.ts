import { IAlbum } from '../../types/Album';

interface AlbumItemProps {
  item: IAlbum;
}

interface AlbumItemsProps {
  items: IAlbum[];
}

export type { AlbumItemProps, AlbumItemsProps };
