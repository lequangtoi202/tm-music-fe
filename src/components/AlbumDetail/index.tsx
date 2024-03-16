import { PlayArrow } from '@mui/icons-material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useEffect, useState } from 'react';
import CardItem from '../Card';
import { PlaylistItemSkeleton, RoundedSkeleton } from '../Skeleton';
import { StyledTextHeader } from '../TextHeader/styles';
import {
  AlbumTitle,
  Box,
  BoxCentered,
  CardContainer,
  CardImage,
  HeaderTitle,
  PlayRandomSongButton,
  PlaylistContainer,
  PlaylistItem,
  ResponsiveContainer,
  SongTitle,
  StyledBox,
  StyledBoxTitle,
  Time,
} from './styles';
import { Skeleton } from '@mui/material';

const AlbumDetail = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const data = {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    id: '3',
  };
  return (
    <ResponsiveContainer>
      <CardContainer>
        {loading ? (
          <Skeleton variant="rounded" width="100%" height="200px" animation="wave" />
        ) : (
          <>
            <CardImage>
              <CardItem item={data} />
            </CardImage>
            <BoxCentered>
              <StyledTextHeader>Title album</StyledTextHeader>
              <Box>Cập nhật: 2024-03-06</Box>
              <Box>Harri Won</Box>
              <Box>100 Views</Box>
              <PlayRandomSongButton>
                <PlayArrow />
                PHÁT NGẪU NHIÊN
              </PlayRandomSongButton>
            </BoxCentered>
          </>
        )}
      </CardContainer>
      <PlaylistContainer>
        <HeaderTitle>
          <Box>BÀI HÁT</Box>
          <Box>ALBUM</Box>
          <Box>THỜI GIAN</Box>
        </HeaderTitle>
        {loading
          ? Array.from({ length: 50 }, (_, index) => <PlaylistItemSkeleton key={index} />)
          : Array.from({ length: 50 }, (_, index) => (
              <PlaylistItem key={index}>
                <SongTitle>
                  <HeadphonesIcon style={{ marginRight: '8px' }} />
                  <StyledBox>
                    <StyledBoxTitle>Tên bài hát {index + 1}</StyledBoxTitle>
                    <StyledBoxTitle>Harri Won</StyledBoxTitle>
                  </StyledBox>
                </SongTitle>
                <AlbumTitle>Tên album</AlbumTitle>
                <Time>03:30</Time>
              </PlaylistItem>
            ))}
      </PlaylistContainer>
    </ResponsiveContainer>
  );
};

export default AlbumDetail;
