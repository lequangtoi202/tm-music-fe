import { Reply } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KContext } from '../../context';
import { ISong } from '../../types/Song';
import Image from '../Image';
import { Modal, ModalContent, StyledBackdrop } from '../MoreAction';
import { PlaylistItem, SongTitle, StyledBox, StyledBoxTitle } from '../MoreAction/styles';
import CommentMapping from './CommentMapping';
import FormComment from './FormComment';
import { CommentContainer, CommentWrapper, StyledComment, StyledName, UserAvatar, UserWrapper } from './styles';
import { Client } from '@gradio/client';

function CommentModal({ song }: { song: ISong }) {
  const { openCommentDialog, setOpenCommentDialog } = useContext(KContext);
  const [comments, setComments] = useState<any[]>([]);
  const [expandedComments, setExpandedComments] = useState<any[]>([]);
  const [openReplyForms, setOpenReplyForms] = useState<string | null>(null);
  const visibleComments = comments.filter((comment) => comment.parentId === undefined);
  const hasParentComment = comments.filter((comment) => comment.parentId !== undefined);
  const commentsWithSubComments = visibleComments.map((comment) => {
    const subComments = hasParentComment.filter((subComment) => subComment.parentId === comment.id);
    return {
      ...comment,
      subComments,
    };
  });
  const mockComments = [
    {
      id: '1',
      content: 'First comment',
      songId: '123',
      parentId: undefined,
      replies: [
        {
          id: '3',
          content: 'First comment',
          songId: '123',
          parentId: '1',
          replies: [],
          count_reply: 0,
          createdBy: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
          },
        },
        {
          id: '4',
          content: 'First comment',
          songId: '123',
          parentId: '1',
          replies: [
            {
              id: '5',
              content: 'First comment fdasdfas djasg  jagdj jgjdas bjubda dbjugadjb n  hjdba jjhda  ihdkas lorem',
              songId: '123',
              parentId: '4',
              replies: [
                {
                  id: '6',
                  content: 'First comment fdasdfas djasg  jagdj jgjdas bjubda dbjugadjb n  hjdba jjhda  ihdkas lorem',
                  songId: '123',
                  parentId: '5',
                  replies: [
                    {
                      id: '7',
                      content: 'dasdasd asdas asdas yurt 34235345 dbjugadjb n  hjdba jjhda  ihdkas lorem',
                      songId: '123',
                      parentId: '6',
                      replies: [],
                      count_reply: 0,
                      createdBy: {
                        id: '1',
                        firstName: 'John',
                        lastName: 'Doe',
                        avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
                      },
                    },
                  ],
                  count_reply: 1,
                  createdBy: {
                    id: '1',
                    firstName: 'John',
                    lastName: 'Doe',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
                  },
                },
              ],
              count_reply: 1,
              createdBy: {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
              },
            },
          ],
          count_reply: 1,
          createdBy: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
          },
        },
      ],
      count_reply: 2,
      createdBy: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
      },
    },
  ];

  useEffect(() => {
    (async () => {
      //const res = await getCommentsOfSong(song.id);
      setComments(mockComments);
    })();
  }, [song]);

  const handleReply = (commentId: string) => {
    setOpenReplyForms((prevOpenReplyForm) => (prevOpenReplyForm === commentId ? null : commentId));
  };

  const toggleExpand = (commentId: string) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data: any) => {
    //call api to create comment
    const app = await Client.duplicate('ShynBui/Vietnamese_classification', {
      hf_token: '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',
    });
    setComments([
      ...comments,
      {
        id: Math.random().toString(36).substring(2),
        content: 'First comment',
        songId: '123',
        parentId: undefined,
        replies: [],
        count_reply: 0,
        createdBy: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
        },
      },
    ]);
  };
  return (
    <Modal
      open={openCommentDialog}
      sx={{ margin: '0 20px' }}
      onClose={() => setOpenCommentDialog(false)}
      aria-labelledby="modal-modal-title"
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={{ width: 640 }}>
        <PlaylistItem>
          <SongTitle>
            <Image src={song?.logo || ''} alt={song.title} />
            <StyledBox>
              <StyledBoxTitle>
                <Typography fontWeight={700} variant="inherit" noWrap>
                  {song.title}
                </Typography>
              </StyledBoxTitle>
              <StyledBoxTitle>
                <Typography variant="inherit" noWrap>
                  ca sĩ 1
                </Typography>
              </StyledBoxTitle>
            </StyledBox>
          </SongTitle>
        </PlaylistItem>
        <CommentContainer>
          <Box sx={{ fontWeight: 700, fontSize: 14 }}>Bình luận</Box>
          {commentsWithSubComments.map((comment, idx) => (
            <CommentWrapper key={idx}>
              <UserWrapper>
                <UserAvatar>
                  <Image src={comment.createdBy.avatar} alt={comment.createdBy.firstName} />
                </UserAvatar>
                <StyledName>Hey na</StyledName>
              </UserWrapper>
              <StyledComment>
                <Typography variant="inherit">{comment.content}</Typography>
                <IconButton onClick={() => handleReply(comment.id)}>
                  <Reply />
                  <Typography fontSize={12} variant="inherit" noWrap>
                    Phản hồi
                  </Typography>
                </IconButton>
                <IconButton onClick={() => toggleExpand(comment.id)}>
                  {comment.count_reply > 0 && (
                    <Typography fontSize={12} variant="inherit" noWrap>
                      {expandedComments.includes(comment.id) ? 'Ẩn bớt' : 'Xem thêm'}
                    </Typography>
                  )}
                </IconButton>
              </StyledComment>
              {expandedComments.includes(comment.id) && (
                <CommentMapping
                  paddingLeft="36px"
                  onSubmit={onSubmit}
                  handleSubmit={handleSubmit}
                  register={register}
                  comments={comment.replies}
                  openReplyForms={openReplyForms}
                  setOpenReplyForm={setOpenReplyForms}
                  reset={reset}
                />
              )}
              {openReplyForms === comment.id && (
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
        </CommentContainer>
        <FormComment reset={reset} onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} />
      </ModalContent>
    </Modal>
  );
}

export default CommentModal;
