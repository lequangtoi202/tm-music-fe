import { CheckCircle, Warning } from '@mui/icons-material';
import { Box, Fade, IconButton, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import images from '../../assets/images';
import { KContext } from '../../context';
import { createComment, deleteComment, getCommentsOfSong, validateComment } from '../../services/user';
import { ISong } from '../../types/Song';
import Image from '../Image';
import { Modal, ModalContent, StyledBackdrop } from '../MoreAction';
import { PlaylistItem, SongTitle, StyledBox, StyledBoxTitle } from '../MoreAction/styles';
import FormComment from './FormComment';
import {
  CommentContainer,
  CommentWrapper,
  StyledComment,
  StyledName,
  StyledNegative,
  StyledPositive,
  StyledViewMoreComment,
  UserAvatar,
  UserWrapper,
} from './styles';

function CommentModal({ song }: { song: ISong }) {
  const { openCommentDialog, setOpenCommentDialog, currentSong, setError } = useContext(KContext);
  const [comments, setComments] = useState<any[]>([]);
  const [singers, setSingers] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data: any) => {
    const result = await validateComment(data.comment);
    const res = await createComment({
      content: data.comment,
      songId: currentSong?.id,
      status: result[0] === 'POSITIVE' ? true : false,
    });
    setComments([...comments, res]);
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id);
    getComments(song.id);
  };

  const getComments = async (id: number, append: boolean = false) => {
    const res = await getCommentsOfSong(id);
    const data = res?.data;
    const newComments = data?.comments ?? [];
    if (append) {
      setComments((prevComments) => [...prevComments, ...newComments]);
    } else {
      setComments(newComments);
    }
    setTotalPages(data?.total_pages);
  };

  useEffect(() => {
    if (openCommentDialog) {
      getComments(song.id);
    }
    setSingers(song.singers?.map((singer) => singer.name).join(', ') || '');
  }, [song, openCommentDialog]);

  const handleViewMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      getComments(song.id, true);
    }
  };

  return (
    <Modal
      open={openCommentDialog}
      sx={{ margin: '0 20px' }}
      onClose={() => {
        setOpenCommentDialog(false);
        setComments([]);
      }}
      aria-labelledby="modal-modal-title"
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={openCommentDialog}>
        <ModalContent sx={{ width: 640 }}>
          <PlaylistItem>
            <SongTitle>
              <Image src={song?.image || '../../assets/images/no-image.png'} alt={song.title} />
              <StyledBox>
                <StyledBoxTitle>
                  <Typography fontWeight={700} variant="inherit" noWrap>
                    {song.title}
                  </Typography>
                </StyledBoxTitle>
                <StyledBoxTitle>
                  <Typography variant="inherit" noWrap>
                    {singers}
                  </Typography>
                </StyledBoxTitle>
              </StyledBox>
            </SongTitle>
          </PlaylistItem>
          <CommentContainer>
            <Box sx={{ fontWeight: 700, fontSize: 14 }}>Bình luận</Box>
            {comments?.map((comment, idx) => (
              <CommentWrapper key={idx}>
                <UserWrapper>
                  <UserAvatar>
                    <Image src={comment.createdBy?.avatar ?? images.noImage} alt={comment.createdBy?.firstName} />
                  </UserAvatar>
                  <StyledName>{comment.createdBy?.firstName}</StyledName>
                </UserWrapper>
                <StyledComment>
                  {comment?.status ? (
                    <StyledPositive>
                      <Typography variant="inherit">{comment?.content}</Typography>
                      <CheckCircle />
                    </StyledPositive>
                  ) : (
                    <StyledNegative>
                      <Typography variant="inherit">{comment?.content}</Typography>
                      <Warning />
                    </StyledNegative>
                  )}

                  <IconButton onClick={() => handleDeleteComment(comment.id)}>
                    <Typography fontSize={12} variant="inherit" noWrap>
                      Xóa
                    </Typography>
                  </IconButton>
                </StyledComment>
              </CommentWrapper>
            ))}
            {page < totalPages && <StyledViewMoreComment onClick={handleViewMore}>Xem thêm</StyledViewMoreComment>}
          </CommentContainer>
          <FormComment reset={reset} onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} />
        </ModalContent>
      </Fade>
    </Modal>
  );
}

export default CommentModal;
