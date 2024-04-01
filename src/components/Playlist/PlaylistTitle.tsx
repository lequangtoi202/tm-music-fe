import { FC } from 'react';
import { StyledPlaylistTitle } from './styles';

interface PlaylistTitleProps {
  title: string;
}
export const PLaylistTitle: FC<PlaylistTitleProps> = ({ title }) => {
  return <StyledPlaylistTitle>{title}</StyledPlaylistTitle>;
};
