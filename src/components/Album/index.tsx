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
import { setTempCurrentAlbum, setTempCurrentSong } from '../../utils/storage';

const AlbumContainer: React.FC<AlbumItemsProps> = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction, currentAlbum } = useContext(KContext);

  const handleLikeSong = (id: string) => {
    console.log(id);
  };
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      {items.map((item, idx) => (
        <StyledAlbumItem key={idx}>
          <StyledChildAlbumItem>
            {loading ? (
              <RoundedSkeleton />
            ) : (
              <StyledWrapper>
                <StyledLayerHover>
                  <Tooltip placement="top" title="Yêu thích">
                    <IconButton onClick={() => handleLikeSong(item.id)}>
                      <FavoriteBorder />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top" title="Phát">
                    <IconButton
                      onClick={() => {
                        const randomSong = item.songs[Math.floor(Math.random() * item.songs.length)];
                        setCurrentSong(randomSong);
                        setTempCurrentSong(randomSong);
                        setTempCurrentAlbum(item);
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
                        setCurrentAlbum(item);
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Tooltip>
                </StyledLayerHover>
                <Image src={item.image ?? '../../assets/images/no-image.png'} alt="" />
              </StyledWrapper>
            )}
          </StyledChildAlbumItem>
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </StyledAlbumItem>
      ))}
      <MoreAction song={currentAlbum} />
    </Container>
  );
};

export default AlbumContainer;
