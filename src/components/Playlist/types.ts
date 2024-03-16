import { IPlaylist } from '../../types/Playlist';

interface PlaylistItemProps {
  item: IPlaylist;
  loading: boolean;
}

interface PlaylistItemsProps {
  items: IPlaylist[];
}

export type { PlaylistItemProps, PlaylistItemsProps };
