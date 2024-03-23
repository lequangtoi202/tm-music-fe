import { Box } from '@mui/material';
import { RoundedSkeleton } from '../../Skeleton';
import { StyledHistoryItem } from '../styles';
import { HistoryItemProps } from '../types';

const HistoryItem: React.FC<HistoryItemProps> = ({ item, loading }) => {
  return (
    <StyledHistoryItem>
      {loading ? (
        <Box height={'100%'} width={'100%'}>
          <RoundedSkeleton />
        </Box>
      ) : (
        <Box>{item.title}</Box>
      )}
    </StyledHistoryItem>
  );
};

export default HistoryItem;
