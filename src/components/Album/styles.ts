import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  padding-left: 24px;
  padding-right: 24px;

  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;

const StyledAlbumItem = styled.div`
  margin: 8px;
  width: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  @media (min-width: 1201px) {
    & > div:first-child {
      height: 246px;
      width: 100%;
    }
  }
  @media (max-width: 1200px) {
    flex-basis: calc(33.33% - 16px);
    & > div:first-child {
      height: 240px;
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    flex-basis: calc(50% - 16px);
    & > div:first-child {
      height: 240px;
      width: 100%;
    }
  }
  @media (max-width: 480px) {
    flex-basis: 100%;
    & > div:first-child {
      height: 200px;
      width: 100%;
    }
  }
`;

const StyledChildAlbumItem = styled.div`
  border-radius: 6px;
  & div {
    height: 100%;
    width: 100%;
  }
`;

export { Container, StyledAlbumItem, StyledChildAlbumItem };
