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
      height: 120px;
      width: 100%;
    }
  }
`;

const StyledPlaylistItem = styled.div`
  flex: 1;
  margin: 8px;
  cursor: pointer;
  position: relative;

  @media (min-width: 1201px) {
    flex-basis: calc(25% - 16px);
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
    flex-basis: calc(33.33% - 16px);
    & > div {
      height: 150px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    & > div {
      height: 120px;
      width: 100%;
    }
  }
`;

const StyledAddPlaylistWrapper = styled.div`
  height: 100%;
  color: #1976d2;
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
  padding-bottom: 10px;

  & div:first-child {
    width: 100%;
    height: 80%;
  }

  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
`;

export { Container, StyledPlaylistItem, StyledChildPlaylistItem, StyledAddPlaylistWrapper, StyledAddPlaylist };
