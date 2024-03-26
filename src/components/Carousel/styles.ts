import { Box } from '@mui/material';
import styled from 'styled-components';

const StyledBoxInner = styled(Box)`
  & > div > div:nth-child(2) {
    border-radius: 10px;
  }
`;

export { StyledBoxInner };
