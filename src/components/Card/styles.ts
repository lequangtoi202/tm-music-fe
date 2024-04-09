import { Box } from '@mui/material';
import styled from 'styled-components';

const StyleCardImage = styled(Box)`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
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
  cursor: pointer;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: none;
    border: none;

    & > svg {
      font-size: 68px;
      fill: #fff;
      transition: fill 0.3s ease;

      @media (max-width: 480px) {
        font-size: 46px;
      }
    }

    &:hover > svg {
      fill: #1976d2;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export { StyleCardImage, StyledLayerHover };
