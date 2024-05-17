import { Favorite, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import { KContext } from '../../../context';
import { createLike, unlike } from '../../../services/user';
import { setTempCurrentAlbum, setTempCurrentSong } from '../../../utils/storage';
import Image from '../../Image';
import { PLaylistTitle } from '../../Playlist/PlaylistTitle';
import { RoundedSkeleton, TitleSkeleton } from '../../Skeleton';
import { StyledLayerHover, StyledThemeItem, StyledWrapper } from '../styles';
import { ThemeItemProps } from '../types';
import images from '../../../assets/images';

const ThemeItem: React.FC<ThemeItemProps> = ({ item, loading }) => {
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction, setError } = useContext(KContext);
  const [liked, setLiked] = useState(item.liked);

  const handleToggleLike = async () => {
    const songIds = item.id;
    if (!liked) {
      await createLike([songIds], 'album_ids');
      setLiked(true);
    } else {
      await unlike([songIds], 'album_ids');
      setLiked(false);
    }
  };

  const handlePLayAlbum = () => {
    if (item?.songs?.length > 0) {
      if (!item?.songs || item?.songs?.length === 0) setError('Album không có bài hát');
      const randomSong = item?.songs ? item.songs[Math.floor(Math.random() * item?.songs?.length)] : null;
      setCurrentSong(randomSong);
      setCurrentAlbum(item);
      setTempCurrentSong(randomSong);
      setTempCurrentAlbum(item);
    }
  };

  return (
    <StyledThemeItem>
      {loading ? (
        <Box height={216}>
          <RoundedSkeleton />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <StyledWrapper>
            <StyledLayerHover>
              {!liked ? (
                <Tooltip placement="top" title="Yêu thích">
                  <IconButton onClick={() => handleToggleLike()}>
                    <FavoriteBorder />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip placement="top" title="Bỏ Yêu thích">
                  <IconButton onClick={() => handleToggleLike()}>
                    <Favorite />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip placement="top" title="Phát">
                <IconButton onClick={handlePLayAlbum}>
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
            <Image src={item.image ?? images.noImage} />
          </StyledWrapper>
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </Box>
      )}
    </StyledThemeItem>
  );
};

export default ThemeItem;
