import { FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import Image from '../../Image';
import { PLaylistTitle } from '../../Playlist/PlaylistTitle';
import { RoundedSkeleton } from '../../Skeleton';
import { StyledLayerHoverHistories, StyledWrapper } from '../../Theme/styles';
import { StyledHistoryItem } from '../styles';
import { HistoryItemProps } from '../types';

const HistoryItem: React.FC<HistoryItemProps> = ({ item, loading }) => {
  return (
    <StyledHistoryItem>
      {loading ? (
        <Box height={'200px'} width={'100%'}>
          <RoundedSkeleton />
        </Box>
      ) : (
        <Box display={'flex'} flexDirection={'column'}>
          <StyledWrapper>
            <StyledLayerHoverHistories>
              <Tooltip placement="top" title="Yêu thích">
                <IconButton>
                  <FavoriteBorder />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Phát">
                <IconButton>
                  <PlayCircleOutline />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Khác">
                <IconButton>
                  <MoreHoriz />
                </IconButton>
              </Tooltip>
            </StyledLayerHoverHistories>
            <Image src={item.logo}></Image>
          </StyledWrapper>
          <PLaylistTitle id={item.id} title={item.title} />
        </Box>
      )}
    </StyledHistoryItem>
  );
};

export default HistoryItem;
