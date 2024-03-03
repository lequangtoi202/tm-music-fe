import { createContext, useState } from 'react';

import { IGlobalContext, KContextProps } from '../types/context';
import { breakpointLarge } from '../constants';
import { useMediaQuery } from '@react-hook/media-query';

export const KContext = createContext<IGlobalContext>({} as IGlobalContext);

export const KContextProvider = ({ children }: KContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width: ${breakpointLarge}px)`);

  return (
    <KContext.Provider
      value={{
        isMobile,
        isLoggedIn,
      }}
    >
      {children}
    </KContext.Provider>
  );
};
