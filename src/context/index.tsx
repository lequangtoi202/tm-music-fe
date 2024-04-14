import { createContext, useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { breakpointLarge } from '../constants';
import { ISong } from '../types/Song';
import { IUser } from '../types/User';
import { IGlobalContext, KContextProps } from '../types/context';
import { IAlbum } from '../types/Album';

export const KContext = createContext<IGlobalContext>({} as IGlobalContext);

export const KContextProvider = ({ children }: KContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<IAlbum | null>(null);
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);
  const [isOpenMoreAction, setIsOpenMoreAction] = useState<boolean>(false);
  const [isOpenSendToEmail, setIsOpenSendToEmail] = useState<boolean>(false);
  const [isOpenAddPlaylistModal, setIsOpenAddPlaylistModal] = useState<boolean>(false);
  const [isOpenOTP, setIsOpenOTP] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width: ${breakpointLarge}px)`);

  return (
    <KContext.Provider
      value={{
        isMobile,
        isLoggedIn,
        isOpenMoreAction,
        currentSong,
        currentUser,
        currentAlbum,
        openCommentDialog,
        isOpenAddPlaylistModal,
        isOpenOTP,
        isOpenSendToEmail,
        error,
        success,
        setSuccess,
        setError,
        setIsOpenAddPlaylistModal,
        setIsOpenMoreAction,
        setCurrentAlbum,
        setCurrentUser,
        setCurrentSong,
        setIsLoggedIn,
        setOpenCommentDialog,
        setIsOpenOTP,
        setIsOpenSendToEmail,
      }}
    >
      {children}
    </KContext.Provider>
  );
};
