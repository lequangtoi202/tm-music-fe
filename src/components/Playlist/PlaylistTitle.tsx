import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPlaylistTitle } from './styles';

interface PlaylistTitleProps {
  id: number;
  title: string;
  isSong?: boolean;
  mymusic?: boolean;
}
export const PLaylistTitle: FC<PlaylistTitleProps> = ({ title, id, isSong = false, mymusic = false }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!isSong) {
      if (mymusic) {
        navigate(`/mymusic/albums/${id}`);
      } else {
        navigate(`/albums/${id}`);
      }
    }
  };

  return <StyledPlaylistTitle onClick={handleClick}>{title}</StyledPlaylistTitle>;
};
