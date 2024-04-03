import { IGenre } from './Genre';

interface ISong {
  title: string;
  id: string;
  lyric: string;
  releaseDate: string;
  duration: string;
  views: number;
  track_number: number;
  logo?: string;
  file?: string;
  genre: IGenre;
}

export type { ISong };
