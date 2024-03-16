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
  background-color: green;
  border-radius: 10px;

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

const PlayRandomSongButton = styled.div`
  width: 64%;
  height: 50px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #0d6efd;
  position: relative;
  color: #fff;
  padding: 0 12px;
  margin-top: 6px;

  .MuiSvgIcon-root {
    width: 20%;
    fill: #fff;
  }

  @media (max-width: 480px) {
    width: 55%;
    height: 45px;
    padding: 0 6px;
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
  padding: 8px;
  height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Box = styled.div`
  flex: 1;
  text-align: center;
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
  flex: 2.25;
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
    & > div {
      & > div {
        &:nth-child(1) {
          font-weight: 'bold';
          font-size: 12px;
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
  flex: 1.75;

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
`;

const StyledBoxTitle = styled.div`
  font-size: 14px;
  font-weight: normal;

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
  PlayRandomSongButton,
  HeaderTitle,
  Box,
  PlaylistItem,
  SongTitle,
  AlbumTitle,
  Time,
  StyledBoxTitle,
  StyledBox,
};
