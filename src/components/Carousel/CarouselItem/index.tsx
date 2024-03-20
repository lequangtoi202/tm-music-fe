import { Box, Paper } from '@mui/material';
import { CarouselItemProps } from '../types';

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="center" height="100%">
      <Paper style={{ height: '100%', width: '100%', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.15)' }}>
        <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Paper>
    </Box>
  );
};

export default CarouselItem;
