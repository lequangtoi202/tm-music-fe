import styled from 'styled-components';

const CardContainer = styled.div`
  flex: 1;
  min-width: 32%;
  min-height: 500px;
`;

const CardImage = styled.div`
  height: 60%;
  margin: 10px;
  background-color: green;
  border-radius: 10px;
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
`;

const PlaylistContainer = styled.div`
  flex: 1;
  min-width: 68%;
  padding: 10px 30px 10px 10px;
  max-height: 500px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
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
`;

const AlbumTitle = styled.span`
  font-size: 14px;
  flex: 1.75;
`;

const Time = styled.span`
  flex: 1;
  font-size: 14px;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledBoxTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
`;

const ResponsiveContainer = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
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
