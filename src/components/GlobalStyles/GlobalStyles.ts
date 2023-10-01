import { ReactElement } from 'react';
import './GlobalStyles.scss';

interface GlobalStylesProps {
  children: ReactElement;
}

function GlobalStyles({ children }: GlobalStylesProps) {
  return children;
}

export default GlobalStyles;
