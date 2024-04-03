import { IAlbum } from '../../types/Album';

interface PlaylistItemProps {
  item: IAlbum;
  loading?: boolean;
}

interface PlaylistItemsProps {
  items: IAlbum[];
}

export type { PlaylistItemProps, PlaylistItemsProps };
