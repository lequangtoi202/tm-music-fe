import { Favorite, FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import { createLike, pushToHistories, unlike } from '../../services/user';
import Image from '../Image';
import { MoreAction } from '../MoreAction';
import { PLaylistTitle } from '../Playlist/PlaylistTitle';
import { RoundedSkeleton, TitleSkeleton } from '../Skeleton';
import { StyledLayerHover } from '../Theme/styles';
import { Container, StyledAlbumItem, StyledChildAlbumItem } from './styles';
import { AlbumItemsProps } from './types';
import images from '../../assets/images';
import { StyledWrapper } from '../Playlist/styles';

const AlbumContainer: React.FC<AlbumItemsProps> = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const [likedAlbums, setLikedAlbums] = useState<Record<number, boolean>>({});
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction, tempSongOrAlbum, setTempSongOrAlbum, setError } =
    useContext(KContext);

  const handleToggleLike = async (id: number) => {
    const liked = likedAlbums[id];
    if (liked) {
      await unlike([id], 'album_ids');
    } else {
      await createLike([id], 'album_ids');
    }
    setLikedAlbums({ ...likedAlbums, [id]: !liked });
  };

  const handleSaveToHistory = async (id: number) => {
    await pushToHistories(id);
  };

  useEffect(() => {
    const initialLikedAlbums: Record<number, boolean> = items.reduce(
      (acc, item) => {
        acc[item.id] = item.liked;
        return acc;
      },
      {} as Record<number, boolean>,
    );
    setLikedAlbums(initialLikedAlbums);
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    })();
  }, [items]);

  return (
    <Container>
      {items &&
        items.map((item, idx) => (
          <StyledAlbumItem key={idx}>
            <StyledChildAlbumItem>
              {loading ? (
                <RoundedSkeleton />
              ) : (
                <StyledWrapper>
                  <StyledLayerHover>
                    {!likedAlbums[item.id] ? (
                      <Tooltip placement="top" title="Yêu thích">
                        <IconButton onClick={() => handleToggleLike(item.id)}>
                          <FavoriteBorder />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip placement="top" title="Bỏ Yêu thích">
                        <IconButton onClick={() => handleToggleLike(item.id)}>
                          <Favorite />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip placement="top" title="Phát">
                      <IconButton
                        onClick={async () => {
                          if (!item.songs || item.songs.length === 0) setError('Playlist không có bài hát');
                          const randomSong = item.songs
                            ? item.songs[Math.floor(Math.random() * item.songs.length)]
                            : null;
                          setCurrentSong(randomSong);
                          setCurrentAlbum(item);
                          if (randomSong?.id) {
                            await handleSaveToHistory(randomSong.id);
                          }
                        }}
                      >
                        <PlayCircleOutline />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Khác">
                      <IconButton
                        onClick={() => {
                          setIsOpenMoreAction(true);
                          setTempSongOrAlbum(item);
                        }}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </Tooltip>
                  </StyledLayerHover>
                  <Image src={item.image ?? images.noImage} alt="" />
                </StyledWrapper>
              )}
            </StyledChildAlbumItem>
            {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
          </StyledAlbumItem>
        ))}
      <MoreAction song={tempSongOrAlbum} />
    </Container>
  );
};

export default AlbumContainer;
