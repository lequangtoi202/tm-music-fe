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

const StyledPositive = styled(Box)`
  display: flex;
  align-items: center;

  & svg {
    font-size: 16px;
    margin-left: 6px;
    color: #43a047;
  }
`;

const StyledNegative = styled(Box)`
  display: flex;
  align-items: center;

  & svg {
    font-size: 16px;
    margin-left: 6px;
    color: #e53935;
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

  .loading {
    animation: spinner 0.8s linear infinite;
    margin-top: 12px;
  }

  @keyframes spinner {
    from {
      transform: translateY(-50%) rotate(0);
    }
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  & input {
    padding: 8px;
  }
`;

const StyledViewMoreComment = styled(Box)`
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    color: #1976d2;
    text-decoration: underline;
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
  StyledNegative,
  StyledPositive,
  StyledViewMoreComment,
};
