import { Favorite, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import { KContext } from '../../../context';
import { createLike, unlike } from '../../../services/user';
import { setTempCurrentSong } from '../../../utils/storage';
import Image from '../../Image';
import { PLaylistTitle } from '../../Playlist/PlaylistTitle';
import { RoundedSkeleton } from '../../Skeleton';
import { StyledLayerHoverHistories, StyledWrapper } from '../../Theme/styles';
import { StyledHistoryItem } from '../styles';
import { HistoryItemProps } from '../types';

const HistoryItem: React.FC<HistoryItemProps> = ({ item, loading }) => {
  const { setIsOpenMoreAction, setCurrentSong } = useContext(KContext);
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
                  onClick={() => {
                    setCurrentSong(item);
                    setTempCurrentSong(item);
                  }}
                >
                  <PlayCircleOutline />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Khác">
                <IconButton onClick={() => setIsOpenMoreAction(true)}>
                  <MoreHoriz />
                </IconButton>
              </Tooltip>
            </StyledLayerHoverHistories>
            <Image src={item.image} />
          </StyledWrapper>
          <PLaylistTitle id={item.id} title={item.title} isSong={true} />
        </Box>
      )}
    </StyledHistoryItem>
  );
};

export default HistoryItem;
