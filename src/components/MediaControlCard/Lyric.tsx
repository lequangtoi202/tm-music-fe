import { Box, Fade } from '@mui/material';
import { useContext, useEffect } from 'react';
import { KContext } from '../../context';
import { ISong } from '../../types/Song';
import { Modal, ModalContent, StyledBackdrop } from '../MoreAction';
import { LyricContainer } from './styles';

function LyricModal({ song }: { song: ISong }) {
  const { isShowLyric, setIsShowLyric, currentSong } = useContext(KContext);

  useEffect(() => {}, [song]);

  return (
    <Modal
      open={isShowLyric}
      sx={{ margin: '0 20px' }}
      onClose={() => {
        setIsShowLyric(false);
      }}
      aria-labelledby="modal-modal-title"
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isShowLyric}>
        <ModalContent sx={{ width: 640 }}>
          <LyricContainer>
            <Box sx={{ fontWeight: 700, fontSize: 18 }}>Lời bài hát</Box>
            <Box sx={{ whiteSpace: 'pre-line', fontSize: 14 }}>{currentSong?.lyric}...</Box>
          </LyricContainer>
        </ModalContent>
      </Fade>
    </Modal>
  );
}

export default LyricModal;
