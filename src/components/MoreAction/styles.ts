import styled from 'styled-components';

const PlaylistItem = styled.div`
  padding: 8px;
  height: 60px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
    border-radius: 6px;
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

  & > img {
    width: 43px;
    height: 43px;
    border-radius: 4px;
    margin-right: 6px;
  }

  @media (max-width: 480px) {
    & > div {
      & > div {
        &:nth-child(1) {
          font-weight: 'bold';
          font-size: 14px;
        }
      }
    }

    & > svg {
      font-size: 20px;
    }
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
  overflow: hidden;
  text-overflow: ellipsis;
  width: 11rem;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export { PlaylistItem, SongTitle, StyledBoxTitle, StyledBox };
