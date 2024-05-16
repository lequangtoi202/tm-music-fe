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
  const [tempSongOrAlbum, setTempSongOrAlbum] = useState<ISong | IAlbum | null>(null);
  const [isOpenMoreAction, setIsOpenMoreAction] = useState<boolean>(false);
  const [isOpenSendToEmail, setIsOpenSendToEmail] = useState<boolean>(false);
  const [playlistChanged, setChangedPlaylist] = useState<boolean>(false);
  const [roomChanged, setChangedRoom] = useState<boolean>(false);
  const [isShowLyric, setIsShowLyric] = useState<boolean>(false);
  const [isOpenAddPlaylistModal, setIsOpenAddPlaylistModal] = useState<boolean>(false);
  const [isOpenAddRoomModal, setIsOpenAddRoomModal] = useState<boolean>(false);
  const [isOpenOTP, setIsOpenOTP] = useState<boolean>(false);
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);
  const [albumIdUpload, setAlbumIdUpload] = useState<number | undefined>(undefined);
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
        audio:
          'https://vnso-zn-24-tf-a128-z3.zmdcdn.me/ed296514b07543c8f29162802af28948?authen=exp=1715875585~acl=/ed296514b07543c8f29162802af28948/*~hmac=8af4e8a0b7339831c9cffab628287beb',
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
        albumIdUpload,
        tempSongOrAlbum,
        roomChanged,
        isOpenAddRoomModal,
        setChangedRoom,
        setIsOpenAddRoomModal,
        setTempSongOrAlbum,
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
        setAlbumIdUpload,
      }}
    >
      {children}
    </KContext.Provider>
  );
};
