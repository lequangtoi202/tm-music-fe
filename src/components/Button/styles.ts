import LoadingButton from '@mui/lab/LoadingButton';
import styled from 'styled-components';
import { TButtonProps } from './types';

const StyledButton = styled(LoadingButton)<TButtonProps>`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  font-weight: 500;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.02);
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export { StyledButton };
