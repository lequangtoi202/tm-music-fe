import { useEffect, useState } from 'react';
import { Container, StyledAlbumItem, StyledChildAlbumItem } from './styles';
import { AlbumItemsProps } from './types';
import { RoundedSkeleton } from '../Skeleton';
import { Box } from '@mui/material';

const AlbumContainer: React.FC<AlbumItemsProps> = ({ items }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Container>
      {items.map((item, index) => (
        <StyledAlbumItem key={index}>
          <StyledChildAlbumItem>{loading ? <RoundedSkeleton /> : <Box>{item.title}</Box>}</StyledChildAlbumItem>
        </StyledAlbumItem>
      ))}
    </Container>
  );
};

export default AlbumContainer;
