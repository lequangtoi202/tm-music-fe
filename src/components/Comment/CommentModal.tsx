import { Box, IconButton, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KContext } from '../../context';
import { createComment, deleteComment, getCommentsOfSong, validateComment } from '../../services/user';
import { ISong } from '../../types/Song';
import Image from '../Image';
import { Modal, ModalContent, StyledBackdrop } from '../MoreAction';
import { PlaylistItem, SongTitle, StyledBox, StyledBoxTitle } from '../MoreAction/styles';
import FormComment from './FormComment';
import { CommentContainer, CommentWrapper, StyledComment, StyledName, UserAvatar, UserWrapper } from './styles';

function CommentModal({ song }: { song: ISong }) {
  const { openCommentDialog, setOpenCommentDialog, currentSong } = useContext(KContext);
  const [comments, setComments] = useState<any[]>([]);
  const [singers, setSingers] = useState<string>('');

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data: any) => {
    const result = await validateComment(data.comment);
    if (result[0] === 'POSITIVE') {
      const res = await createComment({
        content: data.comment,
        songId: currentSong?.id,
      });
      setComments([...comments, res]);
    } else {
      alert('Bình luận không hợp lệ');
      //THAY ĐỔI LẠI THÀNH THÔNG BÁO LỖI
    }
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id);
    await getComments(song.id);
  };

  const getComments = async (id: string) => {
    const res = await getCommentsOfSong(song.id);
    setComments(res);
    setSingers(song.singers?.map((singer) => singer.name).join(', '));
  };

  useEffect(() => {
    getComments(song.id);
  }, [song]);

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
        {/* <CommentContainer>
          <Box sx={{ fontWeight: 700, fontSize: 14 }}>Bình luận</Box>
          {comments?.map((comment, idx) => (
            <CommentWrapper key={idx}>
              <UserWrapper>
                <UserAvatar>
                  <Image
                    src={comment.createdBy?.avatar ?? '../../assets/images/no-image.png'}
                    alt={comment.createdBy?.firstName}
                  />
                </UserAvatar>
                <StyledName>{comment.createdBy?.firstName}</StyledName>
              </UserWrapper>
              <StyledComment>
                <Typography variant="inherit">{comment?.content}</Typography>
                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                  <Typography fontSize={12} variant="inherit" noWrap>
                    Xóa
                  </Typography>
                </IconButton>
              </StyledComment>
            </CommentWrapper>
          ))}
        </CommentContainer> */}
        <FormComment reset={reset} onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} />
      </ModalContent>
    </Modal>
  );
}

export default CommentModal;
