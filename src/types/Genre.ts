import { ISong } from './Song';

interface IGenre {
  title: string;
  id: number;
  description: string;
  songs?: ISong[];
  image?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type { IGenre };
