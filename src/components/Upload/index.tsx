import { Modal as BaseModal } from '@mui/base/Modal';
import { Box, Fade, Typography } from '@mui/material';
import { css, styled } from '@mui/system';
import clsx from 'clsx';
import { forwardRef, useContext, useState } from 'react';
import FileUpload from 'react-material-file-upload';
import { KContext } from '../../context';
import { StyledOTPButton } from '../OTP/styles';
function UploadModal() {
  const { isOpenUpload, setIsOpenUpload } = useContext(KContext);
  const [files, setFiles] = useState<File[]>([]);

  const handleClose = () => {
    setIsOpenUpload(false);
  };
  const handleUploadImage = () => {
    //CALL API to update me album
    console.log(files);
  };
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpenUpload}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isOpenUpload}>
        <ModalContent sx={{ width: 480, height: 320 }}>
          <Box width={'100%'} height={'100%'} display={'flex'}>
            <FileUpload
              sx={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              value={files}
              title="Chọn hoặc kéo file ảnh vào đây để tải lên"
              onChange={setFiles}
              multiple={true}
              buttonText="Chọn ảnh"
            />
          </Box>
          <StyledOTPButton onClick={handleUploadImage} disabled={files.length > 0 ? false : true} variant="contained">
            Tải lên
          </StyledOTPButton>
        </ModalContent>
      </Fade>
    </Modal>
  );
}

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

export default UploadModal;
