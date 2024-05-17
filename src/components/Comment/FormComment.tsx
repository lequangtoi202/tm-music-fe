import { Send } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FormCommentWrapper, StyledTextField } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
function FormComment({
  onSubmit,
  handleSubmit,
  register,
  paddingLeft,
  reset,
  isLoading,
}: {
  onSubmit: (data: { comment: string }) => void;
  handleSubmit: any;
  register: any;
  reset: any;
  paddingLeft?: string;
  isLoading?: boolean;
}) {
  const onSubmitWithReset = (data: { comment: string }) => {
    onSubmit(data);
    reset();
  };
  return (
    <FormCommentWrapper component="form" onSubmit={handleSubmit(onSubmitWithReset)} paddingLeft={paddingLeft}>
      <StyledTextField placeholder="Hãy để lại bình luận cho bài hát" fullWidth {...register('comment')} />
      <IconButton type="submit">
        {isLoading ? (
          <FontAwesomeIcon style={{ fontSize: '16px', cursor: 'pointer' }} className="loading" icon={faSpinner} />
        ) : (
          <Send />
        )}
      </IconButton>
    </FormCommentWrapper>
  );
}

export default FormComment;
