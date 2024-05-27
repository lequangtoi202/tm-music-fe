import { IGenre } from './Genre';
import { ISinger } from './Singer';

interface ISong {
  title: string;
  id: number;
  lyric: string;
  release_date: string;
  duration?: string;
  views: number;
  track_number?: number;
  image?: string;
  singers?: ISinger[];
  genre: IGenre;
  genre_id?: number;
  audio?: string;
  liked?: boolean;
  owner?: boolean;
  copyright?: boolean;
  bought?: boolean;
}

export type { ISong };
