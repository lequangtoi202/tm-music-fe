import { Modal as BaseModal } from '@mui/base/Modal';
import { Close } from '@mui/icons-material';
import { Box, Fade, IconButton, Typography } from '@mui/material';
import { css, styled } from '@mui/system';
import clsx from 'clsx';
import { forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { KContext } from '../../context';
import Image from '../Image';

export const AdvertiseBanner = () => {
  const { isOpenAdvertise, setIsOpenAdvertise } = useContext(KContext);

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpenAdvertise}
      onClose={() => setIsOpenAdvertise(false)}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isOpenAdvertise}>
        <ModalContent sx={{ width: 460, backgroundColor: '#1976d2', border: 'none', borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              aria-label="close"
              onClick={() => setIsOpenAdvertise(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: '#fff',
                borderRadius: '50%',
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Typography fontWeight={700} textAlign={'center'} fontSize={24} color={'#fff'} variant="inherit" noWrap>
            TM Music - PREMIUM
          </Typography>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Image
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src="https://res.cloudinary.com/dbkikuoyy/image/upload/v1716730934/cute-caucasian-girl-spring-outfit-listening-music-headphones-smiling-pleased-camera-standing-blue-background_xeus7g.jpg"
              alt="advertise"
            />
          </Box>
          <Box>
            <Typography fontWeight={500} textAlign={'center'} fontSize={22} color={'#fff'} variant="inherit">
              Muốn nghe nhạc không quảng cáo?
            </Typography>
            <Box textAlign="center">
              <Typography display="inline-block" fontSize={14} color={'#fff'} variant="inherit">
                Nâng cấp gói Premium chỉ với 13.000đ/tháng
              </Typography>
            </Box>
            <Typography textAlign={'center'} fontSize={14} color={'#fff'} variant="inherit">
              Tặng bạn nhiều đặc quyền ưu đãi hấp dẫn khác.
            </Typography>
            <Box sx={{ mt: 2 }} display={'flex'} justifyContent={'center'}>
              <Link
                to="/premium"
                style={{
                  color: '#1976d2',
                  fontWeight: 700,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: '8px 16px',
                }}
              >
                KHÁM PHÁ NGAY
              </Link>
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
