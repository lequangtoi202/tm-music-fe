import styled from 'styled-components';

const Container = styled.div`
  height: 30vh;
  margin-left: 24px;
  margin-right: 24px;
`;

const StyledBanner = styled.div`
  border-radius: 6px;
  height: 100%;
  & div {
    height: 100%;
    width: 100%;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export { Container, StyledBanner };
