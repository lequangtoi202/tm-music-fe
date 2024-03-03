import { Box } from '@mui/material';
import styled from 'styled-components';

const StyledTextHeader = styled.div`
  color: black;
  font-size: 24px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Container = styled.div`
  margin-top: 30px;
  margin-left: 32px;
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    & > svg {
      font-size: 32px;
      @media (max-width: 1200px) {
        font-size: 32px;
      }

      @media (max-width: 768px) {
        font-size: 28px;
      }

      @media (max-width: 480px) {
        font-size: 24px;
      }
    }
  }
`;

const StyledViewMore = styled(Box)(
  () => `
        display: flex;
        align-items: center;
        cursor: pointer;

        & > span {
          font-weight: 500;
        }

        &:hover {
          span {
            color: #205df2; 
          }
          color: #205df2;
        }
`,
);
export { StyledTextHeader, Container, StyledViewMore };
