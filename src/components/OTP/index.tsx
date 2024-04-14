import { Input as BaseInput } from '@mui/base/Input';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Fade, Typography } from '@mui/material';
import { Box, css, styled } from '@mui/system';
import clsx from 'clsx';
import React, { forwardRef, useContext, useState } from 'react';
import { KContext } from '../../context';
import { StyledOTPButton } from './styles';

function OTP({
  separator,
  length,
  value,
  OTPValid,
  onChange,
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  OTPValid: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRefs = React.useRef<HTMLInputElement[]>(new Array(length).fill(null));

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
    const currentValue = event.target.value.toUpperCase();
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split('');
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join('');
    });
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>, currentIndex: number) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, currentIndex: number) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split('');

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' ';
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(''));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          {OTPValid ? (
            <BaseInput
              slots={{
                input: InputElement,
              }}
              aria-label={`Digit ${index + 1} of OTP`}
              slotProps={{
                input: {
                  ref: (ele) => {
                    inputRefs.current[index] = ele!;
                  },
                  onKeyDown: (event) => handleKeyDown(event, index),
                  onChange: (event) => handleChange(event, index),
                  onClick: (event) => handleClick(event, index),
                  onPaste: (event) => handlePaste(event, index),
                  value: value[index] ?? '',
                },
              }}
            />
          ) : (
            <BaseInput
              slots={{
                input: InputElement,
              }}
              aria-label={`Digit ${index + 1} of OTP`}
              slotProps={{
                input: {
                  ref: (ele) => {
                    inputRefs.current[index] = ele!;
                  },
                  onKeyDown: (event) => handleKeyDown(event, index),
                  onChange: (event) => handleChange(event, index),
                  onClick: (event) => handleClick(event, index),
                  onPaste: (event) => handlePaste(event, index),
                  value: value[index] ?? '',
                },
              }}
            />
          )}
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default function OTPInput() {
  const { isOpenOTP, setIsOpenOTP } = useContext(KContext);
  const [otp, setOtp] = useState('');
  const [OTPValid, setOTPValid] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const handleSubmitOTP = () => {
    console.log(otp);
    if (otp.length === 6) {
      //hanle submit to BE
      setOTPValid(true);
      setLoading(true);
    } else {
      setOTPValid(false);
    }
  };
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpenOTP}
      onClose={() => {
        setIsOpenOTP(false);
        setOtp('');
        setOTPValid(true);
        setLoading(false);
      }}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isOpenOTP}>
        <ModalContent sx={{ width: 420 }}>
          <Typography variant="h3" align="center" className="modal-title">
            Xác nhận OTP
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h6" align="center" className="modal-title">
              Nhập mã OTP được gửi qua email của bạn
            </Typography>
            <OTP separator={<span></span>} value={otp} OTPValid={OTPValid} onChange={setOtp} length={6} />
            {!OTPValid && (
              <Typography color="error" fontStyle={'italic'}>
                OTP phải đủ 6 ký tự
              </Typography>
            )}
            <StyledOTPButton onClick={handleSubmitOTP} loading={loading} variant="contained">
              Xác nhận
            </StyledOTPButton>
          </Box>
        </ModalContent>
      </Fade>
    </Modal>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

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

const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export const Backdrop = forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'base-Backdrop-open': open }, className)} ref={ref} {...other} />;
});

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
