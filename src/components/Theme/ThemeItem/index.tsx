import { FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Image from '../../Image';
import { RoundedSkeleton, TitleSkeleton } from '../../Skeleton';
import { StyledLayerHover, StyledThemeItem, StyledWrapper } from '../styles';
import { ThemeItemProps } from '../types';
import { useContext } from 'react';
import { KContext } from '../../../context';
import { PLaylistTitle } from '../../Playlist/PlaylistTitle';
import { setTempCurrentAlbum, setTempCurrentSong } from '../../../utils/storage';

const ThemeItem: React.FC<ThemeItemProps> = ({ item, loading }) => {
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction } = useContext(KContext);
  return (
    <StyledThemeItem>
      {loading ? (
        <RoundedSkeleton />
      ) : (
        <StyledWrapper>
          <StyledLayerHover>
            <Tooltip placement="top" title="Yêu thích">
              <IconButton>
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Phát">
              <IconButton
                onClick={() => {
                  const randomSong = item.songs[Math.floor(Math.random() * item.songs.length)];
                  setCurrentSong(randomSong);
                  setCurrentAlbum(item);
                  setTempCurrentSong(randomSong);
                  setTempCurrentAlbum(item);
                }}
              >
                <PlayCircleOutline />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Khác">
              <IconButton
                onClick={() => {
                  setIsOpenMoreAction(true);
                  setCurrentAlbum(item);
                }}
              >
                <MoreHoriz />
              </IconButton>
            </Tooltip>
          </StyledLayerHover>
          <Image src={item.logo} />
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </StyledWrapper>
      )}
    </StyledThemeItem>
  );
};

export default ThemeItem;
