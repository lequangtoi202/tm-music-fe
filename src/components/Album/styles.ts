import styled from 'styled-components';

const Container = styled.div`
  margin-top: 16px;
  display: flex;
  overflow: hidden;
  padding-left: 24px;
  padding-right: 24px;
  justify-content: space-between;
`;

const StyledAlbumItem = styled.div`
  & > div {
    height: 216px;
    width: 212px;
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
