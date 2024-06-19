import { WorkspacePremium } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { getCurrentUser } from '../../utils/storage';
import Image from '../Image';
import { LogoSignWrapper, LogoWrapper, StyledPremiumLogo, StyledPremiumText } from './styles';

function Logo() {
  const currentUser = getCurrentUser();
  return (
    <LogoWrapper to="/">
      <LogoSignWrapper>
        <Image
          src="https://res.cloudinary.com/dx9vr7on4/image/upload/v1714574925/7b1c11c5-11d8-4cf8-b3f3-94f0f7ec6dd9_b9zr8n.jpg"
          alt=""
        />
      </LogoSignWrapper>
      {JSON.parse(currentUser ?? '')?.premium && (
        <StyledPremiumLogo>
          <IconButton>
            <WorkspacePremium />
            <StyledPremiumText>Premium</StyledPremiumText>
          </IconButton>
        </StyledPremiumLogo>
      )}
    </LogoWrapper>
  );
}

export default Logo;
