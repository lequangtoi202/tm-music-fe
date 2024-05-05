import { FC } from 'react';
import { StyledPlaylistTitle } from './styles';
import { useNavigate } from 'react-router-dom';

interface PlaylistTitleProps {
  id: string;
  title: string;
  mymusic?: boolean;
}
export const PLaylistTitle: FC<PlaylistTitleProps> = ({ title, id, mymusic = false }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (mymusic) {
      navigate(`/mymusic/albums/${id}`);
    } else {
      navigate(`/albums/${id}`);
    }
  };

  return <StyledPlaylistTitle onClick={handleClick}>{title}</StyledPlaylistTitle>;
};
