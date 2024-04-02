import { createContext, useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { breakpointLarge } from '../constants';
import { ISong } from '../types/Song';
import { IUser } from '../types/User';
import { IGlobalContext, KContextProps } from '../types/context';

export const KContext = createContext<IGlobalContext>({} as IGlobalContext);

export const KContextProvider = ({ children }: KContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);
  const [isOpenMoreAction, setIsOpenMoreAction] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width: ${breakpointLarge}px)`);

  return (
    <KContext.Provider
      value={{
        isMobile,
        isLoggedIn,
        isOpenMoreAction,
        currentSong,
        currentUser,
        setIsOpenMoreAction,
        setCurrentUser,
        setCurrentSong,
        setIsLoggedIn,
      }}
    >
      {children}
    </KContext.Provider>
  );
};
