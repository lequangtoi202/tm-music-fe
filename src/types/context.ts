import { Dispatch, SetStateAction } from 'react';

export interface IGlobalContext {
  isMobile: boolean;
  isLoggedIn: boolean;
  isOpenMoreAction: boolean;
  setIsOpenMoreAction: Dispatch<SetStateAction<boolean>>;
}

interface KContextProps {
  children: React.ReactNode;
}
export type { KContextProps };
