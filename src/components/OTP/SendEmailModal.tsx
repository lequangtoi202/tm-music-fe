import { Modal as BaseModal } from '@mui/base/Modal';
import { Box, Button, Divider, Fade, Typography } from '@mui/material';
import { css, styled } from '@mui/system';
import clsx from 'clsx';
import { forwardRef, useContext, useState } from 'react';
import { KContext } from '../../context';
import { StyledInput } from '../PlaylistModal/styles';
import { IShareProps } from './types';
import Image from '../Image';
import { PlaylistItem, SongTitle, StyledBox, StyledBoxTitle } from '../MoreAction/styles';
import { createInvitation } from '../../services/user';

export const SendEmail: React.FC<IShareProps> = ({ song }) => {
  const { isOpenSendToEmail, setIsOpenSendToEmail } = useContext(KContext);
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleClose = () => {
    setIsOpenSendToEmail(false);
    setIsEmailValid(true);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setRecipientEmail(email);
    if (validateEmail(email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmitShareSong = async () => {
    await createInvitation({ email: recipientEmail, songId: song?.id });
    setIsOpenSendToEmail(false);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpenSendToEmail}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isOpenSendToEmail}>
        <ModalContent sx={{ width: 280 }}>
          <Typography fontWeight={700} textAlign={'center'} fontSize={20} color={'#1976d2'} variant="inherit" noWrap>
            Chia sẻ bài hát
          </Typography>
          <PlaylistItem>
            <SongTitle>
              <Image src={song?.image} alt={song?.title} />
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
          <Divider />
          <Box width={'100%'}>
            <StyledInput
              autoFocus
              type="email"
              required
              disableUnderline={true}
              onChange={handleChangeEmail}
              placeholder="Nhập email người nhận"
            />
            {!isEmailValid && (
              <Typography sx={{ mt: 1 }} color="error" fontSize={14} fontStyle={'italic'}>
                Email người nhận không hợp lệ
              </Typography>
            )}
            <Box sx={{ mt: 2 }} display={'flex'} justifyContent={'center'}>
              <Button
                sx={{ borderRadius: '18px', flex: 1 }}
                disabled={disabled}
                onClick={handleSubmitShareSong}
                variant="contained"
              >
                Gửi
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
