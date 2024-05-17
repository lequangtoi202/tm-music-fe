import { Box } from '@mui/material';
import styled from 'styled-components';

const StyleCommentSection = styled(Box)`
  max-height: 360px;
  max-width: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
`;
const PlaylistContainer = styled.div`
  max-height: 380px;
  min-width: 68%;
  padding: 10px 30px 10px 10px;
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
  gap: 4px;
  padding: 4px 0;

  &:hover {
    background-color: #e1e0e0;
    border-radius: 6px;
  }
`;

const StyleMoreButton = styled.div`
  cursor: pointer;
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
  & > img {
    width: 43px;
    height: 43px;
    border-radius: 4px;
    margin-right: 6px;
  }

  & > div {
    & > div {
      &:nth-child(1) {
        font-weight: 500;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 480px) {
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

  @media (max-width: 768px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

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
  padding: 4px 0;
`;

const StyledBoxTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  max-width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    max-width: 160px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export {
  PlaylistContainer,
  HeaderTitle,
  Box,
  PlaylistItem,
  SongTitle,
  AlbumTitle,
  Time,
  StyledBoxTitle,
  StyledBox,
  StyleMoreButton,
  StyleCommentSection,
};
