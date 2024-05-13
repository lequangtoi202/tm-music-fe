import styled from 'styled-components';
import { heightHeader } from '../../../../constants';
import { Dialog } from '@mui/material';

const SearchInputContainer = styled.div`
  width: 400px;
  display: flex;
  margin-top: ${heightHeader / 6}px;
  margin-bottom: ${heightHeader / 6}px;
  align-items: center;
  position: relative;

  @media (max-width: 480px) {
    display: none;
  }

  .loading {
    animation: spinner 0.8s linear infinite;
    margin-top: 12px;
  }

  @keyframes spinner {
    from {
      transform: translateY(-50%) rotate(0);
    }
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`;

const MobileSearchButton = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledSearchResult = styled.div`
  position: absolute;
  top: 24px;
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  z-index: -1;
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

export { SearchInputContainer, MobileSearchButton, DialogWrapper, StyledSearchResult };
