import { AddCircleOutline, Close, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import { getMyAlbums } from '../../services/user';
import { IAlbum } from '../../types/Album';
import { setTempCurrentAlbum, setTempCurrentSong } from '../../utils/storage';
import Image from '../Image';
import { MoreAction } from '../MoreAction';
import { PlaylistModal } from '../PlaylistModal';
import { RoundedSkeleton, TitleSkeleton } from '../Skeleton';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';
import UploadModal from '../Upload';
import { PLaylistTitle } from './PlaylistTitle';
import {
  Container,
  StyledAddPlaylist,
  StyledAddPlaylistWrapper,
  StyledChildPlaylistItem,
  StyledItemContainer,
  StyledPlaylistItem,
} from './styles';

function Playlist() {
  const [loading, setLoading] = useState(true);
  const [myAlbums, setMyAlbums] = useState<IAlbum[]>([]);
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction, setIsOpenAddPlaylistModal, currentAlbum } =
    useContext(KContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyAlbums();
      setMyAlbums(res);
      setLoading(false);
    };

    fetchData();
  }, [myAlbums]);

  const handleDeletePlaylist = (id: string) => {
    console.log(id);
  };

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
      {myAlbums.map((item, index) => (
        <StyledItemContainer key={index}>
          <StyledPlaylistItem>
            <StyledChildPlaylistItem>
              {loading ? (
                <RoundedSkeleton />
              ) : (
                <StyledWrapper>
                  <StyledLayerHover>
                    <Tooltip placement="top" title="Xóa">
                      <IconButton onClick={() => handleDeletePlaylist(item.id)}>
                        <Close />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Phát">
                      <IconButton
                        onClick={() => {
                          const randomSong = item.songs[Math.floor(Math.random() * item.songs.length)];
                          setCurrentSong(randomSong);
                          setCurrentAlbum(item);
                          setTempCurrentSong(randomSong);
                          setTempCurrentAlbum(item);
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
                  <Image src={item.image ?? '../../assets/images/no-image.png'} alt={item.title} />
                </StyledWrapper>
              )}
            </StyledChildPlaylistItem>
          </StyledPlaylistItem>
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </StyledItemContainer>
      ))}
      <PlaylistModal />
      <MoreAction song={currentAlbum} />
      <UploadModal />
    </Container>
  );
}

export default Playlist;
