import { Box, Paper } from '@mui/material';
import { CardItemProps } from './types';

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="center" height={'100%'}>
      <Paper>{item.title}</Paper>
    </Box>
  );
};

export default CardItem;
