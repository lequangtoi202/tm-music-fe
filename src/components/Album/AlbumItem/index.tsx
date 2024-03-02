import { Box, Paper } from '@mui/material';
import { AlbumItemProps } from '../types';
import { StyledAlbumItem, StyledChildAlbumItem } from '../styles';

const AlbumItem: React.FC<AlbumItemProps> = ({ item }) => {
  return (
    <StyledAlbumItem>
      <StyledChildAlbumItem>
        <Box>{item.title}</Box>
      </StyledChildAlbumItem>
    </StyledAlbumItem>
  );
};

export default AlbumItem;
