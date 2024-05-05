import { ISong } from './Song';

interface ISinger {
  id: string;
  name: string;
  image: string;
  description: string;
  birthdate: string;
  songs?: ISong[];
  albums: [];
  followed: boolean;
}

export type { ISinger };
