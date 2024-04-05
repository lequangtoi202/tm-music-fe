import { Dispatch, SetStateAction } from 'react';
import { ISong } from './Song';
import { IUser } from './User';
import { IAlbum } from './Album';

export interface IGlobalContext {
  isMobile: boolean;
  isLoggedIn: boolean;
  isOpenMoreAction: boolean;
  currentSong: ISong | null;
  currentUser: IUser | null;
  currentAlbum: IAlbum | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  setCurrentSong: Dispatch<SetStateAction<ISong | null>>;
  setCurrentAlbum: Dispatch<SetStateAction<IAlbum | null>>;
  setIsOpenMoreAction: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

interface KContextProps {
  children: React.ReactNode;
}
export type { KContextProps };
