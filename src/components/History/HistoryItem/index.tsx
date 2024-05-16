import { Favorite, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import images from '../../../assets/images';
import { KContext } from '../../../context';
import { createLike, pushToHistories, unlike } from '../../../services/user';
import Image from '../../Image';
import { PLaylistTitle } from '../../Playlist/PlaylistTitle';
import { RoundedSkeleton } from '../../Skeleton';
import { StyledLayerHoverHistories } from '../../Theme/styles';
import { StyledHistoryItem } from '../styles';
import { HistoryItemProps } from '../types';
import { StyledWrapper } from '../../Playlist/styles';

const HistoryItem: React.FC<HistoryItemProps> = ({ item, loading }) => {
  const { setIsOpenMoreAction, setTempSongOrAlbum, setCurrentSong } = useContext(KContext);
  const [liked, setLiked] = useState(item.liked);

  const handleToggleLike = async () => {
    const songIds = item.id;
    if (!liked) {
      await createLike([songIds], 'song_ids');
      setLiked(true);
    } else {
      await unlike([songIds], 'song_ids');
      setLiked(false);
    }
  };

  const handleSaveToHistory = async (id: number) => {
    await pushToHistories(id);
  };

  return (
    <StyledHistoryItem>
      {loading ? (
        <Box height={'216px'} width={'100%'}>
          <RoundedSkeleton />
        </Box>
      ) : (
        <Box display={'flex'} flexDirection={'column'} height={'216px'}>
          <StyledWrapper>
            <StyledLayerHoverHistories>
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
                <IconButton
                  onClick={async () => {
                    setCurrentSong(item);
                    await handleSaveToHistory(item.id);
                  }}
                >
                  <PlayCircleOutline />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Khác">
                <IconButton
                  onClick={() => {
                    setIsOpenMoreAction(true);
                    setTempSongOrAlbum(item);
                  }}
                >
                  <MoreHoriz />
                </IconButton>
              </Tooltip>
            </StyledLayerHoverHistories>
            <Image src={item.image ?? images.noImage} />
          </StyledWrapper>
          <PLaylistTitle id={item.id} title={item.title} isSong={true} />
        </Box>
      )}
    </StyledHistoryItem>
  );
};

export default HistoryItem;
