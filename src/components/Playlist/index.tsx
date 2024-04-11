import { AddCircleOutline, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Image from '../Image';
import { RoundedSkeleton, TitleSkeleton } from '../Skeleton';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';
import { PLaylistTitle } from './PlaylistTitle';
import {
  Container,
  StyledAddPlaylist,
  StyledAddPlaylistWrapper,
  StyledChildPlaylistItem,
  StyledItemContainer,
  StyledPlaylistItem,
} from './styles';
import { KContext } from '../../context';
import { PlaylistModal } from '../PlaylistModal';

function Playlist() {
  const [loading, setLoading] = useState(true);
  const { setIsOpenAddPlaylistModal } = useContext(KContext);

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
      <StyledItemContainer>
        {loading ? (
          <RoundedSkeleton />
        ) : (
          <StyledAddPlaylistWrapper>
            <StyledAddPlaylist onClick={() => setIsOpenAddPlaylistModal(true)} style={{ height: '100%' }}>
              <AddCircleOutline />
              Tạo playlist mới
            </StyledAddPlaylist>
          </StyledAddPlaylistWrapper>
        )}
      </StyledItemContainer>
      {data.map((item, index) => (
        <StyledItemContainer key={index}>
          <StyledPlaylistItem>
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
            </StyledChildPlaylistItem>
          </StyledPlaylistItem>
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </StyledItemContainer>
      ))}
      <PlaylistModal />
    </Container>
  );
}

export default Playlist;
