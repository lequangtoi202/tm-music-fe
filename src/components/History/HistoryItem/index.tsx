import { Box } from '@mui/material';
import { StyledHistoryItem } from '../styles';
import { HistoryItemProps } from '../types';

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return (
    <StyledHistoryItem>
      <Box>{item.title}</Box>
    </StyledHistoryItem>
  );
};

export default HistoryItem;
