import { createContext, useEffect, useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { breakpointLarge } from '../constants';
import { ISong } from '../types/Song';
import { IUser } from '../types/User';
import { IGlobalContext, KContextProps } from '../types/context';
import { IAlbum } from '../types/Album';
import { getSongDetail } from '../services/user';
import { getCurrentUser } from '../utils/storage';

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
  const [playlistChanged, setChangedPlaylist] = useState<boolean>(false);
  const [isShowLyric, setIsShowLyric] = useState<boolean>(false);
  const [isOpenAddPlaylistModal, setIsOpenAddPlaylistModal] = useState<boolean>(false);
  const [isOpenOTP, setIsOpenOTP] = useState<boolean>(false);
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);
  const [isOpenUploadBackground, setIsOpenUploadBackground] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width: ${breakpointLarge}px)`);

  const fetchData = async () => {
    try {
      const localUser = getCurrentUser();
      if (localUser) {
        setIsLoggedIn(true);
        setCurrentUser(JSON.parse(localUser));
      }
      const data = await getSongDetail('7');
      setCurrentSong({
        title: data.title,
        id: data.id,
        lyric: data.lyric,
        release_date: data.release_date,
        views: data.views,
        track_number: data.track_number,
        image: data.image,
        singers: data.singers,
        genre: data.genre,
        audio: 'https://res.cloudinary.com/dx9vr7on4/video/upload/v1713808834/xm5ojwdexjx5s3lfjmgc.mp3',
        liked: data.liked,
        owner: data.owner,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KContext.Provider
      value={{
        isShowLyric,
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
        isOpenUpload,
        playlistChanged,
        isOpenUploadBackground,
        setIsOpenUploadBackground,
        setChangedPlaylist,
        setIsShowLyric,
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
        setIsOpenUpload,
      }}
    >
      {children}
    </KContext.Provider>
  );
};
