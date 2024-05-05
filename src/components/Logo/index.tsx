import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import Image from '../Image';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        
`,
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 120px;
        height: 72px;
        display: flex;
        justify-content: center;
        & > img {
            height: 100%;
        }
`,
);

function Logo() {
  return (
    <LogoWrapper to="/">
      <LogoSignWrapper>
        <Image
          src="https://res.cloudinary.com/dx9vr7on4/image/upload/v1714574925/7b1c11c5-11d8-4cf8-b3f3-94f0f7ec6dd9_b9zr8n.jpg"
          alt=""
        />
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
