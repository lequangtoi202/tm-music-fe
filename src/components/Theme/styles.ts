import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 14px;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0 16px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const StyledLayerHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  transition: opacity 0.5s ease;
  opacity: 0;
  z-index: 1;

  & > div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & > svg {
      font-size: 30px;
    }

    & > svg:nth-child(2) {
      font-size: 52px;
    }
  }
`;

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  overflow: hidden;
  border-radius: 6px;
  position: relative;

  &:hover {
    & > div {
      opacity: 1;
    }

    & > img {
      transform: scale(1.1);
    }
  }

  & > img {
    cursor: pointer;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }

  & div {
    text-align: center;
    height: 100%;
  }
`;

const StyledThemeItem = styled.div`
  flex: 1;
  border-radius: 6px;
  cursor: pointer;
  height: 200px;
  width: 200px;

  @media (max-width: 768px) {
    flex-basis: calc(50% - 16px);
    & > div {
      height: 100%;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    flex-basis: calc(50% - 16px);
    & > div {
      height: 100%;
      width: 100%;
    }
  }
`;

export { Container, StyledThemeItem, StyledWrapper, StyledLayerHover };
