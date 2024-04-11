import { FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import Image from '../Image';
import { PLaylistTitle } from '../Playlist/PlaylistTitle';
import { RoundedSkeleton, TitleSkeleton } from '../Skeleton';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';
import { Container, StyledAlbumItem, StyledChildAlbumItem } from './styles';
import { AlbumItemsProps } from './types';
import { MoreAction } from '../MoreAction';

const AlbumContainer: React.FC<AlbumItemsProps> = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction, currentSong } = useContext(KContext);

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      {items.map((item, index) => (
        <StyledAlbumItem key={item.id}>
          <StyledChildAlbumItem>
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
                    <IconButton
                      onClick={() => {
                        const randomSong = item.songs[Math.floor(Math.random() * item.songs.length)];
                        setCurrentSong(randomSong);
                        setCurrentAlbum(item);
                      }}
                    >
                      <PlayCircleOutline />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top" title="Khác">
                    <IconButton
                      onClick={() => {
                        setIsOpenMoreAction(true);
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Tooltip>
                </StyledLayerHover>
                <Image src={item.logo}></Image>
              </StyledWrapper>
            )}
          </StyledChildAlbumItem>
          {loading ? <TitleSkeleton /> : <PLaylistTitle title={item.title} />}
        </StyledAlbumItem>
      ))}
      <MoreAction song={currentSong} />
    </Container>
  );
};

export default AlbumContainer;
