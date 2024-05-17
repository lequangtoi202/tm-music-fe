import { ISong } from './Song';

interface IAlbum {
  title: string;
  id: number;
  description: string;
  liked: boolean;
  image: string;
  songs: ISong[];
  singers?: any;
  owner: boolean;
  created_at: string;
  genre_id: number;
}

export type { IAlbum };
