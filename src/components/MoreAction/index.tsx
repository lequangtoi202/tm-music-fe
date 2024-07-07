import { Modal as BaseModal } from '@mui/base/Modal';
import {
  AddBox,
  CloudUpload,
  Comment,
  ControlPoint,
  Download,
  QueueMusic,
  Share,
  ShoppingCart,
} from '@mui/icons-material';
import { DialogContent, Fade, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { css, styled } from '@mui/system';
import axios from 'axios';
import clsx from 'clsx';
import fileDownload from 'js-file-download';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KContext } from '../../context';
import { addSongsToPlaylist, createCheckout, getMyAlbums } from '../../services/user';
import { IAlbum } from '../../types/Album';
import Image from '../Image';
import { PlaylistItem, SongTitle, StyledBox, StyledBoxTitle, StyledListItemIcon, StyledPopover } from './styles';
import { IMoreActionProps } from './types';
import { ISong } from '../../types/Song';
import images from '../../assets/images';

export const MoreAction: React.FC<IMoreActionProps> = ({ song }) => {
  const {
    isOpenMoreAction,
    isMobile,
    tempSongOrAlbum,
    currentUser,
    setIsOpenMoreAction,
    setIsOpenAddPlaylistModal,
    setOpenCommentDialog,
    setIsOpenSendToEmail,
    setIsOpenUpload,
    setIsOpenUploadBackground,
    setAlbumIdUpload,
    setSuccess,
    setError,
  } = useContext(KContext);
  const [isOpenPlaylistList, setIsOpenPlaylistList] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<IAlbum[]>([]);
  const [owner, setOwner] = useState<boolean>(false);
  const { pathname } = useLocation();
  const pageDefault = 1;

  const handleClick = async () => {
    if (!isOpenPlaylistList) {
      const res = await getMyAlbums(pageDefault);
      setPlaylists(res.albums);
      if (res.totalPages > 1) {
        for (let i = 2; i <= res.totalPages; i++) {
          const additionalRes = await getMyAlbums(i);
          setPlaylists((prevPlaylists) => [...prevPlaylists, ...additionalRes]);
        }
      }
    }
    setIsOpenPlaylistList(!isOpenPlaylistList);
  };

  const handleClose = () => {
    setIsOpenMoreAction(false);
    setIsOpenPlaylistList(false);
  };

  const handleDownloadFile = (src: string, filename: string) => {
    axios
      .get(src, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      })
      .catch((err) => {
        console.error('Lỗi không thể tải xuống', err);
      });
  };

  const handleAddSongsToPlaylist = async (playlistId: number) => {
    let songIds: number[] = [];

    if (tempSongOrAlbum && 'songs' in tempSongOrAlbum) {
      songIds = tempSongOrAlbum.songs?.map((item) => item.id) ?? [];
    } else {
      songIds = [Number(tempSongOrAlbum?.id)];
    }

    const res = await addSongsToPlaylist(playlistId, songIds);
    if (res?.status === 200) {
      setSuccess('Thêm vào playlist thành công!');
    } else {
      setError('Thêm vào playlist thất bại!');
    }
  };

  const handleCreateCheckout = async (songId: number) => {
    const data = await createCheckout(songId);
    window.location.href = data.url;
  };

  useEffect(() => {
    setOwner(!!song?.owner);
  }, [song]);

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpenMoreAction}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isOpenMoreAction}>
        <ModalContent sx={{ width: 320 }}>
          <PlaylistItem>
            <SongTitle>
              <Image src={tempSongOrAlbum?.image ?? images.noImage} alt="" />
              <StyledBox>
                <StyledBoxTitle>
                  <Typography fontWeight={700} variant="inherit" noWrap>
                    {tempSongOrAlbum?.title}
                  </Typography>
                </StyledBoxTitle>
                <StyledBoxTitle>
                  <Typography variant="inherit" noWrap>
                    {tempSongOrAlbum?.singers[0]?.name ?? ''}
                  </Typography>
                </StyledBoxTitle>
              </StyledBox>
            </SongTitle>
          </PlaylistItem>
          <List
            sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {isMobile && (
              <ListItemButton
                onClick={() => {
                  setOpenCommentDialog(true);
                }}
              >
                <StyledListItemIcon>
                  <Comment />
                </StyledListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Bình luận" />
              </ListItemButton>
            )}
            {(currentUser?.premium && pathname.includes('/albums/')) || (owner && pathname.includes('/mymusic/')) ? (
              <ListItemButton
                onClick={() => {
                  const song = tempSongOrAlbum as ISong;
                  if (song.audio) {
                    handleDownloadFile(song.audio ?? '', song.title ?? 'download.mp3');
                  } else {
                    setError('Không thể tải xuống bài hát này!');
                  }
                }}
              >
                <StyledListItemIcon>
                  <Download />
                </StyledListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Tải xuống" />
              </ListItemButton>
            ) : (
              <></>
            )}
            {(!owner && !pathname.includes('/mymusic/') && pathname.includes('/albums/')) ||
            (!owner && pathname.includes('/')) ? (
              <ListItemButton
                onClick={() => {
                  if (song?.id) {
                    handleCreateCheckout(song.id);
                  }
                }}
              >
                <StyledListItemIcon>
                  <ShoppingCart />
                </StyledListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Mua bài hát" />
              </ListItemButton>
            ) : (
              <></>
            )}
            {owner && pathname.includes('/mymusic/albums') && (
              <ListItemButton
                onClick={() => {
                  setIsOpenMoreAction(false);
                  setIsOpenSendToEmail(true);
                }}
              >
                <StyledListItemIcon>
                  <Share />
                </StyledListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Chia sẻ bài hát" />
              </ListItemButton>
            )}
            {pathname.includes('/mymusic/playlist') && (
              <>
                <ListItemButton
                  onClick={() => {
                    setIsOpenUploadBackground(true);
                    setAlbumIdUpload(song?.id);
                  }}
                >
                  <StyledListItemIcon>
                    <CloudUpload />
                  </StyledListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Tải ảnh" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setIsOpenUpload(true);
                    setAlbumIdUpload(song?.id);
                  }}
                >
                  <StyledListItemIcon>
                    <CloudUpload />
                  </StyledListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Tải nhạc" />
                </ListItemButton>
              </>
            )}
            <ListItemButton onClick={handleClick}>
              <StyledListItemIcon>
                <ControlPoint />
              </StyledListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Thêm vào playlist" />
            </ListItemButton>
            {isOpenPlaylistList && (
              <StyledPopover>
                <DialogContent sx={{ p: 0 }}>
                  <ListItemButton
                    onClick={() => {
                      setIsOpenMoreAction(false);
                      setIsOpenPlaylistList(false);
                      setIsOpenAddPlaylistModal(true);
                    }}
                  >
                    <StyledListItemIcon>
                      <AddBox />
                    </StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Tạo playlist mới" />
                  </ListItemButton>
                  {playlists?.map((playlist, idx) => (
                    <ListItemButton key={idx} onClick={() => handleAddSongsToPlaylist(playlist.id)}>
                      <StyledListItemIcon>
                        <QueueMusic />
                      </StyledListItemIcon>
                      <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary={playlist.title} />
                    </ListItemButton>
                  ))}
                </DialogContent>
              </StyledPopover>
            )}
          </List>
        </ModalContent>
      </Fade>
    </Modal>
  );
};

export const Backdrop = forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'base-Backdrop-open': open }, className)} ref={ref} {...other} />;
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 10;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.2);
  -webkit-tap-highlight-color: transparent;
`;

export const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.4)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);
