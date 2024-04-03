import { ISong } from './Song';

interface IAlbum {
  title: string;
  id: string;
  description: string;
  logo: string;
  songs: ISong[];
}

export type { IAlbum };
