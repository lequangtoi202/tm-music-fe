import { FC } from 'react';
import { StyledPlaylistTitle } from './styles';
import { useNavigate } from 'react-router-dom';

interface PlaylistTitleProps {
  id: string;
  title: string;
}
export const PLaylistTitle: FC<PlaylistTitleProps> = ({ title, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/albums/${id}`);
  };

  return <StyledPlaylistTitle onClick={handleClick}>{title}</StyledPlaylistTitle>;
};
