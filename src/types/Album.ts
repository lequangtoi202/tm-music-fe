import { ISong } from './Song';

interface IAlbum {
  title: string;
  id: string;
  description: string;
  liked: boolean;
  image: string;
  songs: ISong[];
  owner: boolean;
  created_at: string;
}

export type { IAlbum };
