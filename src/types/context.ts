export interface IGlobalContext {
  isMobile: boolean;
  isLoggedIn: boolean;
}

interface KContextProps {
  children: React.ReactNode;
}
export type { KContextProps };
