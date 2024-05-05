import { ISong } from './Song';

interface ISinger {
  id: string;
  name: string;
  avatar: string;
  description: string;
  birthDate: string;
  songs?: ISong[];
  albums: [];
  followed: boolean;
}

export type { ISinger };
