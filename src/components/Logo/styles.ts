import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledPremiumLogo = styled(Box)`
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  border-radius: 16px;
  & > button {
    & > svg {
      color: red;
    }
  }
`;

const LogoWrapper = styled(Link)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
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
const StyledPremiumText = styled(Box)`
  background: linear-gradient(to right, red, orange);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 24px;
  font-weight: bold;
`;

export { StyledPremiumLogo, LogoWrapper, LogoSignWrapper, StyledPremiumText };
