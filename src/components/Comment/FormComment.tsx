import { Send } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FormCommentWrapper, StyledTextField } from './styles';
function FormComment({
  onSubmit,
  handleSubmit,
  register,
  paddingLeft,
  reset,
}: {
  onSubmit: (data: { comment: string }) => void;
  handleSubmit: any;
  register: any;
  reset: any;
  paddingLeft?: string;
}) {
  const onSubmitWithReset = (data: { comment: string }) => {
    onSubmit(data);
    reset();
  };
  return (
    <FormCommentWrapper component="form" onSubmit={handleSubmit(onSubmitWithReset)} paddingLeft={paddingLeft}>
      <StyledTextField placeholder="Hãy để lại bình luận cho bài hát" fullWidth {...register('comment')} />
      <IconButton type="submit">
        <Send />
      </IconButton>
    </FormCommentWrapper>
  );
}

export default FormComment;
