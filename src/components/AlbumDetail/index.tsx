import { FavoriteBorder, Headphones, MoreHoriz, MoreVert, PlayArrow, PlayCircleOutline } from '@mui/icons-material';
import { Box, Button, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import CardItem from '../Card';
import Image from '../Image';
import { MoreAction } from '../MoreAction';
import { PlaylistItemSkeleton } from '../Skeleton';
import { StyledTextHeader } from '../TextHeader/styles';
import {
  AlbumTitle,
  BoxCentered,
  CardContainer,
  CardImage,
  HeaderTitle,
  PlaylistContainer,
  PlaylistItem,
  ResponsiveContainer,
  SongTitle,
  StyleMoreButton,
  StyledBox,
  StyledBoxTitle,
  StyledGroupAction,
  Time,
} from './styles';

const AlbumDetail = () => {
  const [loading, setLoading] = useState(true);
  const { isMobile, setIsOpenMoreAction, isOpenMoreAction } = useContext(KContext);

  const handleOpenMoreAction = () => {
    console.log(isOpenMoreAction);
    setIsOpenMoreAction(true);
  };

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
          <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />
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
              <Button sx={{ borderRadius: '18px' }} variant="contained" startIcon={<PlayArrow />}>
                PHÁT NGẪU NHIÊN
              </Button>
            </BoxCentered>
          </>
        )}
      </CardContainer>
      <PlaylistContainer>
        {!isMobile ? (
          <>
            <HeaderTitle>
              <Box sx={{ flex: 2.8 }}>BÀI HÁT</Box>
              <Box sx={{ flex: 2.2 }}>ALBUM</Box>
              <Box>THỜI GIAN</Box>
            </HeaderTitle>
            {loading
              ? Array.from({ length: 50 }, (_, index) => <PlaylistItemSkeleton key={index} />)
              : Array.from({ length: 50 }, (_, index) => (
                  <PlaylistItem key={index}>
                    <SongTitle>
                      <Headphones sx={{ marginRight: '8px' }} />
                      <StyledBox>
                        <StyledBoxTitle>Tên bài hát {index + 1}</StyledBoxTitle>
                        <StyledBoxTitle>Harri Won</StyledBoxTitle>
                      </StyledBox>
                    </SongTitle>
                    <AlbumTitle>Tên album</AlbumTitle>
                    <StyledGroupAction>
                      <Tooltip placement="top" title="Yêu thích">
                        <IconButton>
                          <FavoriteBorder />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement="top" title="Phát">
                        <IconButton>
                          <PlayCircleOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement="top" title="Khác">
                        <IconButton>
                          <MoreHoriz />
                        </IconButton>
                      </Tooltip>
                      <Time>03:30</Time>
                    </StyledGroupAction>
                  </PlaylistItem>
                ))}
          </>
        ) : (
          <>
            {loading
              ? Array.from({ length: 50 }, (_, index) => <PlaylistItemSkeleton key={index} />)
              : Array.from({ length: 50 }, (_, index) => (
                  <PlaylistItem key={index}>
                    <SongTitle>
                      <Headphones style={{ marginRight: '8px' }} />
                      <Image
                        src="data:image/jpeg;base64,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"
                        alt="Live from space album cover"
                      />
                      <StyledBox>
                        <StyledBoxTitle>
                          <Typography variant="inherit" noWrap>
                            Tên bài hát {index + 1}
                          </Typography>
                        </StyledBoxTitle>
                        <StyledBoxTitle>Harri Won</StyledBoxTitle>
                      </StyledBox>
                      <StyleMoreButton>
                        <Tooltip placement="top" title="Khác">
                          <IconButton>
                            <MoreVert onClick={handleOpenMoreAction} />
                          </IconButton>
                        </Tooltip>
                      </StyleMoreButton>
                    </SongTitle>
                  </PlaylistItem>
                ))}
          </>
        )}
        <MoreAction song={data} />
      </PlaylistContainer>
    </ResponsiveContainer>
  );
};

export default AlbumDetail;
