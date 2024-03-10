import { Box } from '@mui/material';
import { RoundedSkeleton } from '../../Skeleton';
import { StyledAlbumItem, StyledChildAlbumItem } from '../styles';
import { AlbumItemProps } from '../types';

const AlbumItem: React.FC<AlbumItemProps> = ({ item, loading }) => {
  return (
    <StyledAlbumItem>
      <StyledChildAlbumItem>{loading ? <RoundedSkeleton /> : <Box>{item.title}</Box>}</StyledChildAlbumItem>
    </StyledAlbumItem>
  );
};

export default AlbumItem;
