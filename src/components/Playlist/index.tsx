import { useEffect, useState } from 'react';
import {
  Container,
  StyledAddPlaylist,
  StyledAddPlaylistWrapper,
  StyledChildPlaylistItem,
  StyledPlaylistItem,
} from './styles';
import { RoundedSkeleton } from '../Skeleton';
import { AddCircleOutline, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from '../Image';
import { StyledArtistWrapper } from '../ArtistInfo/styles';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';

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
    {
      src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
    },
    {
      src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
    },
    {
      src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
    },
    {
      src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
    },
  ];
  return (
    <Container>
      <StyledPlaylistItem>
        <StyledChildPlaylistItem>
          {loading ? (
            <RoundedSkeleton />
          ) : (
            <StyledAddPlaylistWrapper>
              <StyledAddPlaylist>
                <AddCircleOutline />
                Tạo playlist mới
              </StyledAddPlaylist>
            </StyledAddPlaylistWrapper>
          )}
        </StyledChildPlaylistItem>
      </StyledPlaylistItem>
      {data.map((item, index) => (
        <StyledPlaylistItem key={index}>
          <StyledChildPlaylistItem>
            {loading ? (
              <RoundedSkeleton />
            ) : (
              <StyledWrapper>
                <StyledLayerHover>
                  <Box>
                    <FavoriteBorder />
                    <PlayCircleOutline />
                    <MoreHoriz />
                  </Box>
                </StyledLayerHover>
                <Image src={item.src}></Image>
              </StyledWrapper>
            )}
          </StyledChildPlaylistItem>
        </StyledPlaylistItem>
      ))}
    </Container>
  );
}

export default Playlist;
