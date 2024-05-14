import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-left: 24px;
  padding-right: 24px;

  @media (max-width: 1200px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  @media (max-width: 768px) {
    & > div {
      height: 160px;
      width: 120px;
    }
  }

  @media (max-width: 480px) {
    & > div {
      height: 140px;
    }
  }
`;

const StyledHistoryItem = styled.div`
  margin: 8px;
  border-radius: 6px;
  cursor: pointer;
  width: 200px;

  @media (max-width: 768px) {
    & > div {
      height: 100%;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    & > div {
      height: 100%;
      width: 100px;
    }
  }
`;

export { Container, StyledHistoryItem };
