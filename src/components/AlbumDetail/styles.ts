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
`;

const PlayRandomSongButton = styled.div`
  width: 64%;
  height: 50px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: red;
  position: relative;
  color: #fff;
  padding: 0 12px;

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
  height: 40px;
  border-bottom: 1px solid #ddd; /* Thêm đường kẻ giữa các mục */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  display: flex;
  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Box = styled.div``;

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
};
