import styled from 'styled-components';
import { heightHeader } from '../../../../constants';
import { Dialog } from '@mui/material';

const SearchInputContainer = styled.div`
  width: 400px;
  display: flex;
  margin-top: ${heightHeader / 6}px;
  margin-bottom: ${heightHeader / 6}px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileSearchButton = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`,
);

export { SearchInputContainer, MobileSearchButton, DialogWrapper };
