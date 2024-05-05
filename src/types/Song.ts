import { IGenre } from './Genre';
import { ISinger } from './Singer';

interface ISong {
  title: string;
  id: string;
  lyric: string;
  release_date: string;
  duration: string;
  views: number;
  track_number: number;
  image?: string;
  singers: ISinger[];
  genre: IGenre;
  audio?: string;
  liked: boolean;
  owner: boolean;
}

export type { ISong };
