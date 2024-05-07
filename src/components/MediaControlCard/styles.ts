import { Box } from '@mui/material';
import styled from 'styled-components';

const CustomCardContent = styled.div`
  padding: 16px;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding-left: 27px;
  height: 100%;
  -webkit-flex-basis: 33.33%;
  -ms-flex-preferred-size: 33.33%;
  flex-basis: 33.33%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  & > img {
    width: 43px;
    height: 43px;
    border-radius: 5px;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    & > img {
      border-radius: 50%;
    }
  }
`;

const CustomDisplayControl = styled(Box)`
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  padding: 0 12px;

  @media (max-width: 480px) {
    flex: 1 1 20%;
    & > div > button > svg {
      width: 1em;
      height: 1em;
    }
  }
`;

const LyricContainer = styled(Box)`
  max-height: 480px;
  overflow-y: auto;
`;

export { CustomCardContent, CustomDisplayControl, LyricContainer };
