import styled from 'styled-components';

const Container = styled.div`
  height: 30vh;
  margin-left: 24px;
  margin-right: 24px;
`;

const StyledBanner = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  height: 100%;
  & div {
    height: 100%;
    width: 100%;
  }
`;

export { Container, StyledBanner };
