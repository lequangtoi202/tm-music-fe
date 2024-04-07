import { Reply } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import Image from '../Image';
import FormComment from './FormComment';
import { CommentWrapper, StyledComment, StyledName, UserAvatar, UserWrapper } from './styles';

function CommentMapping({
  comments,
  paddingLeft,
  onSubmit,
  handleSubmit,
  register,
  reset,
  openReplyForms,
  setOpenReplyForm,
}: {
  comments: any[];
  paddingLeft?: string;
  onSubmit: (data: { comment: string }) => void;
  handleSubmit?: any;
  register?: any;
  reset?: any;
  openReplyForms: string | null;
  setOpenReplyForm: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [expandedComments, setExpandedComments] = useState<any[]>([]);
  const visibleComments = comments.filter((comment) => comment.parentId);
  const hasParentComment = comments.filter((comment) => comment.parentId !== undefined);
  const commentsWithSubComments = visibleComments.map((comment) => {
    const subComments = hasParentComment.filter((subComment) => subComment.parentId === comment.id);
    return {
      ...comment,
      subComments,
    };
  });
  const toggleExpand = (commentId: string) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  const handleReply = (commentId: string) => {
    setOpenReplyForm((prevOpenReplyForm) => (prevOpenReplyForm === commentId ? null : commentId));
  };

  return (
    <>
      {commentsWithSubComments.map((subSubReply: any) => (
        <CommentWrapper key={subSubReply.id} paddingLeft={paddingLeft}>
          <UserWrapper>
            <UserAvatar>
              <Image src={subSubReply.createdBy.avatar} alt={subSubReply.createdBy.firstName} />
            </UserAvatar>
            <StyledName>Hey na</StyledName>
          </UserWrapper>
          <StyledComment>
            <Typography variant="inherit">{subSubReply.content}</Typography>
            <IconButton onClick={() => handleReply(subSubReply.id)}>
              <Reply />
              <Typography fontSize={12} variant="inherit" noWrap>
                Phản hồi
              </Typography>
            </IconButton>
            <IconButton onClick={() => toggleExpand(subSubReply.id)}>
              {subSubReply.count_reply > 0 && (
                <Typography fontSize={12} variant="inherit" noWrap>
                  {expandedComments.includes(subSubReply.id) ? 'Ẩn bớt' : 'Xem thêm'}
                </Typography>
              )}
            </IconButton>
          </StyledComment>
          {expandedComments.includes(subSubReply.id) && (
            <CommentMapping
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              comments={subSubReply.replies}
              openReplyForms={openReplyForms}
              setOpenReplyForm={setOpenReplyForm}
            />
          )}
          {openReplyForms === subSubReply.id && (
            <FormComment
              paddingLeft="36px"
              reset={reset}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
            />
          )}
        </CommentWrapper>
      ))}
    </>
  );
}

export default CommentMapping;
