import { useEffect, useState } from 'react';
import { Container, StyledChildPlaylistItem, StyledPlaylistItem } from './styles';
import { RoundedSkeleton } from '../Skeleton';
import { Box } from '@mui/material';

function Playlist() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
  const data = [
    {
      src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      title: 'Night view',
      id: '3',
    },
    {
      src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      title: 'Lake view',
      id: '2',
    },
    {
      src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
    },
  ];
  return (
    <Container>
      {data.map((item, index) => (
        <StyledPlaylistItem key={index}>
          <StyledChildPlaylistItem>{loading ? <RoundedSkeleton /> : <Box>{item.title}</Box>}</StyledChildPlaylistItem>
        </StyledPlaylistItem>
      ))}
    </Container>
  );
}

export default Playlist;
