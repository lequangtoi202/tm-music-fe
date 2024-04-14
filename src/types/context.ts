import { Dispatch, SetStateAction } from 'react';
import { ISong } from './Song';
import { IUser } from './User';
import { IAlbum } from './Album';

export interface IGlobalContext {
  isMobile: boolean;
  error: string | null;
  success: string | null;
  isLoggedIn: boolean;
  isOpenMoreAction: boolean;
  isOpenOTP: boolean;
  isOpenSendToEmail: boolean;
  isOpenAddPlaylistModal: boolean;
  currentSong: ISong | null;
  currentUser: IUser | null;
  currentAlbum: IAlbum | null;
  openCommentDialog: boolean;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  setCurrentSong: Dispatch<SetStateAction<ISong | null>>;
  setCurrentAlbum: Dispatch<SetStateAction<IAlbum | null>>;
  setIsOpenMoreAction: Dispatch<SetStateAction<boolean>>;
  setIsOpenAddPlaylistModal: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setOpenCommentDialog: Dispatch<SetStateAction<boolean>>;
  setIsOpenOTP: Dispatch<SetStateAction<boolean>>;
  setIsOpenSendToEmail: Dispatch<SetStateAction<boolean>>;
}

interface KContextProps {
  children: React.ReactNode;
}
export type { KContextProps };
