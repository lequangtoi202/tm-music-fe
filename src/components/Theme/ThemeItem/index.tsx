import { Favorite, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Image from '../../Image';
import { RoundedSkeleton, TitleSkeleton } from '../../Skeleton';
import { StyledLayerHover, StyledThemeItem, StyledWrapper } from '../styles';
import { ThemeItemProps } from '../types';
import { useContext } from 'react';
import { KContext } from '../../../context';
import { PLaylistTitle } from '../../Playlist/PlaylistTitle';
import { setTempCurrentAlbum, setTempCurrentSong } from '../../../utils/storage';
import { createLike, retrieveLike } from '../../../services/user';

const ThemeItem: React.FC<ThemeItemProps> = ({ item, loading }) => {
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction } = useContext(KContext);

  // CẦN PHẢI XỬ LÝ THÊM => ĐANG ĐỢI API
  const handleToggleLike = async () => {
    if (!item.liked) {
      const songIds = item.songs?.map((song) => Number(song.id));
      await createLike(songIds);
    } else {
      const songIds = item.songs?.map((song) => Number(song.id));
      await retrieveLike(songIds);
    }
  };
  ///////////////////////////////////////////////////

  const handlePLayAlbum = () => {
    if (item.songs?.length > 0) {
      const randomSong = item.songs[Math.floor(Math.random() * item.songs.length)];
      setCurrentSong(randomSong);
      setCurrentAlbum(item);
      setTempCurrentSong(randomSong);
      setTempCurrentAlbum(item);
    }
  };

  return (
    <StyledThemeItem>
      {loading ? (
        <RoundedSkeleton />
      ) : (
        <StyledWrapper>
          <StyledLayerHover>
            {!item.liked ? (
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
          <Image src={item.image ?? '../../../assets/images/no-image.png'} />
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </StyledWrapper>
      )}
    </StyledThemeItem>
  );
};

export default ThemeItem;
