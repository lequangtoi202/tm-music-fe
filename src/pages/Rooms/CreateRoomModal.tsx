import { Modal as BaseModal } from '@mui/base/Modal';
import { Close } from '@mui/icons-material';
import { Box, Button, Fade, IconButton, Typography } from '@mui/material';
import { css, styled } from '@mui/system';
import clsx from 'clsx';
import { forwardRef, useContext, useState } from 'react';
import { KContext } from '../../context';
import { createMyAlbum } from '../../services/user';
import { StyledInput } from './styles';

export const RoomModal = () => {
  const { isOpenAddRoomModal, setIsOpenAddRoomModal, setSuccess, setError, setChangedRoom, roomChanged } =
    useContext(KContext);
  const [roomName, setRoomName] = useState('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleCreateNewRoom = async () => {
    const formData = new FormData();
    formData.append('title', roomName);

    const res = await createMyAlbum(formData);
    if (res?.status === 201) {
      setSuccess('Tạo phòng thành công!');
      setRoomName('');
      setIsOpenAddRoomModal(false);
      setChangedRoom(!roomChanged);
    } else if (res?.status === 422) {
      setError('Tạo phòng không thành công.');
    }
  };

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpenAddRoomModal}
      onClose={() => setIsOpenAddRoomModal(false)}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isOpenAddRoomModal}>
        <ModalContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              aria-label="close"
              onClick={() => setIsOpenAddRoomModal(false)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <Close />
            </IconButton>
          </Box>
          <Typography fontWeight={700} textAlign={'center'} fontSize={20} color={'#1976d2'} variant="inherit" noWrap>
            Tạo phòng
          </Typography>
          <Box width={'100%'}>
            <StyledInput
              autoFocus
              disableUnderline={true}
              value={roomName}
              onChange={(event) => {
                setRoomName(event.target.value);
                setDisabled(event.target.value.length === 0);
              }}
              placeholder="Nhập tên Room"
            />
            <Box sx={{ mt: 2 }} display={'flex'} justifyContent={'center'}>
              <Button
                sx={{ borderRadius: '18px', flex: 1 }}
                disabled={disabled}
                onClick={handleCreateNewRoom}
                variant="contained"
              >
                TẠO MỚI
              </Button>
            </Box>
          </Box>
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
  z-index: 1400;
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
    width: 360px;
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
