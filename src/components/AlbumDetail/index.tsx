import CardItem from '../Card';
import {
  Box,
  BoxCentered,
  CardContainer,
  CardImage,
  HeaderTitle,
  PlayRandomSongButton,
  PlaylistContainer,
  PlaylistItem,
  ResponsiveContainer,
} from './styles';
import { TextHeader } from '../TextHeader';
import { StyledTextHeader } from '../TextHeader/styles';
import { PlayArrow } from '@mui/icons-material';

const AlbumDetail = () => {
  const data = {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    id: '3',
  };
  return (
    <ResponsiveContainer>
      <CardContainer>
        <CardImage>
          <CardItem item={data} />
        </CardImage>
        <BoxCentered>
          <StyledTextHeader>Title album</StyledTextHeader>
          <div>Title album</div>
          <div>Title album</div>
          <div>Title</div>
          <PlayRandomSongButton>
            <PlayArrow />
            PHÁT NGẪU NHIÊN
          </PlayRandomSongButton>
        </BoxCentered>
      </CardContainer>
      <PlaylistContainer>
        <HeaderTitle>
          <Box>BÀI HÁT</Box>
          <Box>ALBUM</Box>
          <Box>THỜI GIAN</Box>
        </HeaderTitle>
        {Array.from({ length: 50 }, (_, index) => (
          <PlaylistItem key={index}>
            <span>Tên bài hát {index + 1}</span>
            <span>Tên album</span>
            <span>Thời gian</span>
          </PlaylistItem>
        ))}
      </PlaylistContainer>
    </ResponsiveContainer>
  );
};

export default AlbumDetail;
