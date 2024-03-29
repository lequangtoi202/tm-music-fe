import { AddCircleOutline, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from '../Image';
import { RoundedSkeleton } from '../Skeleton';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';
import {
  Container,
  StyledAddPlaylist,
  StyledAddPlaylistWrapper,
  StyledChildPlaylistItem,
  StyledPlaylistItem,
} from './styles';

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
                  <Tooltip placement="top" title="Yêu thích">
                    <IconButton>
                      <FavoriteBorder />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top" title="Phát">
                    <IconButton>
                      <PlayCircleOutline />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top" title="Khác">
                    <IconButton>
                      <MoreHoriz />
                    </IconButton>
                  </Tooltip>
                </StyledLayerHover>
                <Image src={item.src}></Image>
              </StyledWrapper>
            )}
            {/* viết style lại */}
            <Box display={'flex'} flexDirection={'column'} height={'20%'} paddingLeft={1}>
              <Box>Tên title</Box>
              <Box>Source</Box>
            </Box>
          </StyledChildPlaylistItem>
        </StyledPlaylistItem>
      ))}
    </Container>
  );
}

export default Playlist;
