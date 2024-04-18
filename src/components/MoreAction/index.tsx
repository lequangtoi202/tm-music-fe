import { Modal as BaseModal } from '@mui/base/Modal';
import { AddBox, Comment, ControlPoint, Download, QueueMusic, Share } from '@mui/icons-material';
import { DialogContent, Fade, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { css, styled } from '@mui/system';
import axios from 'axios';
import clsx from 'clsx';
import fileDownload from 'js-file-download';
import { forwardRef, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KContext } from '../../context';
import { getMyAlbums } from '../../services/user';
import { IAlbum } from '../../types/Album';
import Image from '../Image';
import { PlaylistItem, SongTitle, StyledBox, StyledBoxTitle, StyledListItemIcon, StyledPopover } from './styles';
import { IMoreActionProps } from './types';

export const MoreAction: React.FC<IMoreActionProps> = ({ song }) => {
  const {
    isOpenMoreAction,
    isMobile,
    setIsOpenMoreAction,
    setIsOpenAddPlaylistModal,
    setOpenCommentDialog,
    setIsOpenSendToEmail,
  } = useContext(KContext);
  const [isOpenPlaylistList, setIsOpenPlaylistList] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<IAlbum[]>([]);
  const { pathname } = useLocation();

  const handleClick = async () => {
    if (!isOpenPlaylistList) {
      const res = await getMyAlbums();
      setPlaylists(res);
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
      });
  };

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
              <Image src={song?.logo} alt={song?.title} />
              <StyledBox>
                <StyledBoxTitle>
                  <Typography fontWeight={700} variant="inherit" noWrap>
                    {song?.title}
                  </Typography>
                </StyledBoxTitle>
                <StyledBoxTitle>
                  <Typography variant="inherit" noWrap>
                    Harri Won
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
              <ListItemButton onClick={() => setOpenCommentDialog(true)}>
                <StyledListItemIcon>
                  <Comment />
                </StyledListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Bình luận" />
              </ListItemButton>
            )}
            <ListItemButton
              onClick={() => {
                handleDownloadFile(
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBqYEUHs9SPync2bo8AmdYjzW5WYicOWF8lreCXnMcQ&s',
                  'test-download.jpg',
                );
              }}
            >
              <StyledListItemIcon>
                <Download />
              </StyledListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Tải xuống" />
            </ListItemButton>
            {pathname.includes('/albums/') && (
              <ListItemButton onClick={() => setIsOpenSendToEmail(true)}>
                <StyledListItemIcon>
                  <Share />
                </StyledListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Chia sẻ bài hát" />
              </ListItemButton>
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
                  {playlists.map((playlist, idx) => (
                    <ListItemButton key={idx}>
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
