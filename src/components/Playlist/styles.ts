import { Box } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  padding-left: 24px;
  padding-right: 24px;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    padding: 0;
    & > div {
      width: 100%;
    }
  }
`;

const StyledItemContainer = styled.div`
  flex: 1;
  margin: 8px;
  cursor: pointer;

  @media (min-width: 1201px) {
    flex-basis: calc(25% - 16px);
    & > div > div {
      height: 216px;
      width: 100%;
    }
  }

  @media (max-width: 1200px) {
    flex-basis: calc(33.33% - 16px);
    & > div > div {
      height: 180px;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-basis: calc(33.33% - 16px);
    & > div > div {
      height: 150px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    & > div > div {
      height: 120px;
      width: 100%;
    }
  }
`;

const StyledPlaylistItem = styled.div`
  cursor: pointer;
  position: relative;
`;

const StyledAddPlaylistWrapper = styled.div`
  height: 100%;
  color: #1976d2;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
`;

const StyledAddPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 16px;
  height: 100%;

  & > svg {
    font-size: 42px;
    @media (max-width: 1200px) {
      font-size: 32px;
    }
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StyledChildPlaylistItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;

  & div {
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
`;

const StyledPlaylistTitle = styled(Box)`
  padding: 4px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #1976d2;
  }
`;

export {
  Container,
  StyledPlaylistItem,
  StyledChildPlaylistItem,
  StyledAddPlaylistWrapper,
  StyledAddPlaylist,
  StyledItemContainer,
  StyledPlaylistTitle,
};
