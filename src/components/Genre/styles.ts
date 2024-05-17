import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-left: 24px;
  padding-right: 24px;
  flex-wrap: wrap;
  overflow: hidden;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledGenreItem = styled.div`
  flex: 1;
  margin: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  @media (min-width: 1201px) {
    flex-basis: calc(20% - 16px);
    & > div:first-child {
      height: 216px;
      width: 100%;
    }
  }
  @media (max-width: 1200px) {
    flex-basis: calc(33.33% - 16px);
    & > div:first-child {
      height: 180px;
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    flex-basis: calc(50% - 16px);
    & > div:first-child {
      height: 172px;
      width: 100%;
    }
  }
  @media (max-width: 480px) {
    flex-basis: 100%;
    & > div:first-child {
      height: 146px;
      width: 100%;
    }
  }
`;

const StyledChildGenreItem = styled.div`
  border-radius: 6px;
  & div {
    height: 100%;
    width: 100%;
  }
`;

export { Container, StyledGenreItem, StyledChildGenreItem };
