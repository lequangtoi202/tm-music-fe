import { IAlbum } from '../../types/Album';
import { ISong } from '../../types/Song';

interface IMoreActionProps {
  song: ISong | IAlbum | null;
}

export type { IMoreActionProps };
