import { Box, TextField } from '@mui/material';
import styled from 'styled-components';

const CommentContainer = styled(Box)`
  max-height: 480px;
  overflow-y: auto;
`;

const CommentWrapper = styled(Box)`
  margin: 6px 0;
  padding: 0;
  position: relative;
  display: flex;
`;

const UserWrapper = styled(Box)`
  max-height: 100px;
  display: flex;
  gap: 6px;
`;

const StyledName = styled(Box)`
  font-size: 14px;
  font-weight: 600;
`;

const UserAvatar = styled(Box)`
  width: 30px;
  height: 30px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledComment = styled(Box)`
  font-size: 14px;
  font-weight: 400;
  padding-left: 12px;
  & > button {
    padding: 2px 6px;
    font-weight: 700;
    & > svg {
      font-size: 14px;
      margin-right: 4px;
    }
  }
`;

const FormCommentWrapper = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;

  & > button > svg {
    color: #1976d2;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  & input {
    padding: 8px;
  }
`;

export {
  CommentWrapper,
  UserAvatar,
  UserWrapper,
  StyledName,
  StyledComment,
  CommentContainer,
  FormCommentWrapper,
  StyledTextField,
};
