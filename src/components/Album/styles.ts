import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  padding-left: 24px;
  padding-right: 24px;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledAlbumItem = styled.div`
  flex: 1;
  margin: 8px;
  cursor: pointer;

  @media (min-width: 1201px) {
    & > div {
      height: 216px;
      width: 100%;
    }
  }

  @media (max-width: 1200px) {
    flex-basis: calc(33.33% - 16px);
    & > div {
      height: 180px;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-basis: calc(50% - 16px);
    & > div {
      height: 150px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
    & > div {
      height: 120px;
      width: 100%;
    }
  }
`;

const StyledChildAlbumItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  & div {
    height: 100%;
    width: 100%;
  }
`;

export { Container, StyledAlbumItem, StyledChildAlbumItem };
