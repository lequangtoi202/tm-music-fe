import { Box } from '@mui/material';
import styled from 'styled-components';

const CardContainer = styled.div`
  flex: 1;
  min-width: 32%;
  min-height: 500px;

  @media (max-width: 480px) {
    min-height: 300px;
  }
`;

const CardImage = styled.div`
  height: 60%;
  margin: 10px;
  border-radius: 6px;

  @media (max-width: 768px) {
    height: 50%;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const BoxCentered = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  & > div {
    &:nth-child(n + 2) {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    & > div {
      &:nth-child(n + 2) {
        font-size: 12px;
      }
    }
  }
`;

const PlaylistContainer = styled.div`
  flex: 1;
  min-width: 68%;
  padding: 10px 30px 10px 10px;
  max-height: 500px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 0;
  }
`;

const PlaylistItem = styled.div`
  height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: #e1e0e0;
    border-radius: 6px;
  }
`;

const StyleMoreButton = styled.div`
  cursor: pointer;
`;

const StyledGroupAction = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;

  & > *:hover {
    color: #1976d2;
    transition: fill 0.3s ease;
    cursor: pointer;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  padding: 8px;
  width: 100%;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const SongTitle = styled.span`
  flex: 3;
  display: flex;
  align-items: center;

  & > div {
    & > div {
      &:nth-child(1) {
        font-weight: 500;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    & > img {
      width: 43px;
      height: 43px;
      border-radius: 4px;
      margin-right: 6px;
    }

    & > div {
      & > div {
        &:nth-child(1) {
          font-weight: 'bold';
          font-size: 12px;
          max-width: 200px;
        }
      }
    }

    & > svg {
      font-size: 20px;
    }
  }
`;

const AlbumTitle = styled.span`
  font-size: 14px;
  flex: 2;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Time = styled.span`
  flex: 1;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const StyledBoxTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  max-width: 240px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ResponsiveContainer = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    ${CardContainer}, ${PlaylistContainer} {
      min-width: 100%;
    }
  }
`;

export {
  ResponsiveContainer,
  CardContainer,
  PlaylistContainer,
  CardImage,
  BoxCentered,
  HeaderTitle,
  Box,
  PlaylistItem,
  SongTitle,
  AlbumTitle,
  Time,
  StyledBoxTitle,
  StyledBox,
  StyleMoreButton,
  StyledGroupAction,
};
