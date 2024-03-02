import { Box, Paper } from '@mui/material';
import { CardItemProps } from './types';

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="center" height={'100%'}>
      <Paper style={{ height: '100%', width: '100%', border: '1px solid rgba(0,0,0,0.05)' }}>{item.title}</Paper>
    </Box>
  );
};

export default CardItem;
