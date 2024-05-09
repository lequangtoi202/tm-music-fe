import { AddCircleOutline, Close, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import { deleteMyAlbum, getMyAlbums } from '../../services/user';
import { IAlbum } from '../../types/Album';
import { setTempCurrentAlbum, setTempCurrentSong } from '../../utils/storage';
import Image from '../Image';
import { MoreAction } from '../MoreAction';
import { PlaylistModal } from '../PlaylistModal';
import { RoundedSkeleton, TitleSkeleton } from '../Skeleton';
import Snackbars from '../Snackbar';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';
import UploadModal from '../Upload';
import UploadSongModal from '../Upload/UploadSong';
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
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const {
    setCurrentSong,
    setCurrentAlbum,
    setIsOpenMoreAction,
    setIsOpenAddPlaylistModal,
    currentAlbum,
    error,
    success,
    setSuccess,
    setError,
    playlistChanged,
    albumIdUpload,
  } = useContext(KContext);

  const fetchData = async () => {
    const res = await getMyAlbums(page);
    setMyAlbums(res.albums);
    setTotalPages(res.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [playlistChanged]);

  const handleDeletePlaylist = async (id: number) => {
    const res = await deleteMyAlbum(id);
    if (res?.status === 200) {
      setSuccess('Xóa playlist thành công');
    } else if (res?.status === 422) {
      setError('Xóa playlist không thành công');
    }
    fetchData();
  };

  const handleViewMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchData();
    }
  };

  return (
    <>
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
        {myAlbums?.map((item, index) => (
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
                            if (!item.songs || item.songs.length === 0) setError('Playlist không có bài hát');
                            const randomSong = item.songs
                              ? item.songs[Math.floor(Math.random() * item.songs.length)]
                              : null;
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
            {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} mymusic={true} />}
          </StyledItemContainer>
        ))}

        <PlaylistModal />
        <MoreAction song={currentAlbum} />
        <UploadModal albumId={albumIdUpload} />
        <UploadSongModal albumId={albumIdUpload} />
        {error && <Snackbars status="error" open={true} message={error} />}
        {success && <Snackbars status="success" open={true} message={success} />}
      </Container>
      {page < totalPages && (
        <Box display={'flex'} justifyContent={'center'} mt={3}>
          <Button sx={{ borderRadius: '18px' }} variant="contained" onClick={handleViewMore} component="button">
            Xem thêm
          </Button>
        </Box>
      )}
    </>
  );
}

export default Playlist;
