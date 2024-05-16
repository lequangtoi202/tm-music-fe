import { Box } from '@mui/material';
import styled from 'styled-components';

const StyledArtistWrapper = styled.div`
  width: 192px;
  height: 192px;
  border-radius: 50%;
  flex: 1;
  overflow: hidden;

  & > img {
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  & div {
    text-align: center;
    height: 100%;
  }

  @media (min-width: 1025px) {
    height: 178px;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;

const StyledArtistInfo = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    & > div:nth-child(1) {
      font-size: 14px;
    }

    & > button > div {
      font-size: 10px;
    }

    & > button {
      padding: 6px 8px;
    }
  }
`;

const FollowButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  cursor: pointer;
  background-color: #1976d2;
  position: relative;
  color: #fff;
  padding: 3px 12px;
  margin-top: 6px;
  width: 80%;

  & > svg {
    width: 18%;
    fill: #fff;
    margin-right: 3px;
  }

  @media (max-width: 480px) {
    border-radius: 20px;
    width: 100%;
    padding: 3px;

    & > div {
      font-size: 12px;
    }

    & > svg {
      width: 20%;
    }
  }
`;

const StyleSkeleton = styled(Box)`
  @media (max-width: 480px) {
    & > div {
      & > span {
        width: 90px !important;
        height: 90px !important;
      }

      & > div {
        & span {
          width: 90px !important;
          height: 28px !important;
        }
      }
    }
  }
`;

export { StyledArtistWrapper, StyledArtistInfo, FollowButton, StyleSkeleton };
