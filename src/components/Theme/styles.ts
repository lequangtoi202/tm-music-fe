import { Box } from '@mui/material';
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
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  transition: opacity 0.5s ease;
  opacity: 0;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: none;
    border: none;

    & > svg {
      font-size: 32px;
      fill: #fff;
      transition: fill 0.3s ease;

      @media (max-width: 480px) {
        font-size: 24px;
      }
    }

    &:hover > svg {
      fill: #1976d2;
    }

    &:hover {
      cursor: pointer;
    }
  }

  & > button:nth-child(2) {
    & > svg {
      font-size: 52px;
      fill: #fff;
      transition: fill 0.3s ease;
    }

    &:hover > svg {
      fill: #1976d2;
    }

    &:hover {
      cursor: pointer;
    }

    @media (max-width: 480px) {
      & > svg {
        font-size: 26px;
      }
    }
  }
`;

const StyledWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 6px;
  position: relative;
  height: 100%;

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

const StyledLayerHoverHistories = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  transition: opacity 0.5s ease;
  opacity: 0;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: none;
    border: none;

    & > svg {
      font-size: 32px;
      fill: #fff;
      transition: fill 0.3s ease;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    &:hover > svg {
      fill: #1976d2;
    }

    &:hover {
      cursor: pointer;
    }

    @media (max-width: 768px) {
      padding: 2px;
    }
  }

  & > button:nth-child(2) {
    & > svg {
      font-size: 52px;
      fill: #fff;
      transition: fill 0.3s ease;
    }

    &:hover > svg {
      fill: #1976d2;
    }

    &:hover {
      cursor: pointer;
    }

    @media (max-width: 768px) {
      & > svg {
        font-size: 28px;
      }
    }
  }
`;

export { Container, StyledThemeItem, StyledWrapper, StyledLayerHover, StyledLayerHoverHistories };
