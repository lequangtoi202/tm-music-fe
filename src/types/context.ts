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
  isOpenUpload: boolean;
  isOpenUploadBackground: boolean;
  isOpenOTP: boolean;
  isOpenSendToEmail: boolean;
  isOpenAddPlaylistModal: boolean;
  isOpenAddRoomModal: boolean;
  isOpenAdvertise: boolean;
  currentSong: ISong | null;
  currentUser: IUser | null;
  currentAlbum: IAlbum | null;
  openCommentDialog: boolean;
  isShowLyric: boolean;
  playlistChanged: boolean;
  roomChanged: boolean;
  albumIdUpload: number | undefined;
  tempSongOrAlbum: ISong | IAlbum | null;
  setTempSongOrAlbum: Dispatch<SetStateAction<ISong | IAlbum | null>>;
  setAlbumIdUpload: Dispatch<SetStateAction<number | undefined>>;
  setChangedPlaylist: Dispatch<SetStateAction<boolean>>;
  setChangedRoom: Dispatch<SetStateAction<boolean>>;
  setIsOpenUploadBackground: Dispatch<SetStateAction<boolean>>;
  setIsShowLyric: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  setCurrentSong: Dispatch<SetStateAction<ISong | null>>;
  setCurrentAlbum: Dispatch<SetStateAction<IAlbum | null>>;
  setIsOpenMoreAction: Dispatch<SetStateAction<boolean>>;
  setIsOpenAddPlaylistModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenAddRoomModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenAdvertise: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setOpenCommentDialog: Dispatch<SetStateAction<boolean>>;
  setIsOpenOTP: Dispatch<SetStateAction<boolean>>;
  setIsOpenSendToEmail: Dispatch<SetStateAction<boolean>>;
  setIsOpenUpload: Dispatch<SetStateAction<boolean>>;
}

interface KContextProps {
  children: React.ReactNode;
}
export type { KContextProps };
