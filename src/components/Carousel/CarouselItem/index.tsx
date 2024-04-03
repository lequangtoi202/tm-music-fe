import { Box, Paper } from '@mui/material';
import { CarouselItemProps } from '../types';

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="center" height="100%">
      <Paper style={{ height: '100%', width: '100%' }}>
        <img src={item.logo} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Paper>
    </Box>
  );
};

export default CarouselItem;
