import { ISong } from './Song';

interface IGenre {
  title: string;
  id: string;
  description: string;
  songs: ISong[];
  logo: string | null;
  src: string;
}

export type { IGenre };
