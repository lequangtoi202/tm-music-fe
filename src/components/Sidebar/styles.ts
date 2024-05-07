import { Box } from '@mui/material';
import styled from 'styled-components';

const StyledPremiumLogo = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  & > img {
    width: 160px;
    height: 160px;
    object-fit: cover;
  }
`;

export { StyledPremiumLogo };
