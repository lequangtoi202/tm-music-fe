// @ts-nocheck

import {
  Favorite,
  FavoriteBorder,
  Headphones,
  MoreHoriz,
  MoreVert,
  PlayArrow,
  PlayCircleOutline,
} from '@mui/icons-material';
import { Box, Button, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { KContext } from '../../context';
import { IAlbum } from '../../types/Album';
import { ISong } from '../../types/Song';
import { setTempCurrentSong } from '../../utils/storage';
import CardItem from '../Card';
import Image from '../Image';
import { PlaylistModal } from '../PlaylistModal';
import { PlaylistItemSkeleton } from '../Skeleton';
import { StyledTextHeader } from '../TextHeader/styles';
import moment from 'moment';
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
import { createLike, unlike, getGenre } from '../../services/user';

interface GenreDetailProps {
  songs?: ISong[];
  genre?: any;
}

const GenreDetail: React.FC<GenreDetailProps> = (props) => {
  const { setError, setSuccess } = useContext(KContext);
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [genre, setGenre] = useState<any>(null);
  const [likedSongs, setLikedSongs] = useState<Record<number, boolean>>({});
  const { setCurrentSong, isMobile, setIsOpenMoreAction } = useContext(KContext);
  const { genreId } = useParams<{ genreId?: string }>();

  const handleOpenMoreAction = () => {
    setIsOpenMoreAction(true);
  };

  let totalViews: number = 0;

  const handleToggleLike = async (id: number, liked: any) => {
    if (!liked) {
      const res = await createLike([id], 'song_ids');
      setLikedSongs({ ...likedSongs, [id]: true });
      if (res?.status === 201) setSuccess('Yêu thích thành công!');
      else setError('Yêu thích thất bại!');
    } else {
      const res = await unlike([id], 'song_ids');
      if (res?.status === 200) setSuccess('Bỏ yêu thích thành công!');
      else setError('Bỏ yêu thích thất bại!');
      setLikedSongs({ ...likedSongs, [id]: false });
    }
    fetchData(genreId);
  };

  const fetchData = async (id: any) => {
    setLoading(true);
    const data = await getGenre(id);
    setGenre(data);
  };

  useEffect(() => {
    fetchData(genreId);
    setLoading(false);
  }, [genreId]);

  const handleDuration = (link: any): Promise<any> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = link;
      audio.onloadedmetadata = () => {
        const maxDuration = Math.floor(audio.duration);
        const minutes = Math.floor(maxDuration / 60);
        const seconds = Math.floor(maxDuration % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedDuration = `${formattedMinutes}:${formattedSeconds}`;
        resolve(formattedDuration);
      };
      audio.onerror = () => {
        resolve('00:00');
      };
    });
  };

  const [songDurations, setSongDurations] = useState<string[]>([]);

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const promises = genre?.songs?.map((song) => handleDuration(song.audio)) || [];
        const durations = await Promise.all(promises);
        setSongDurations(durations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching song durations:', error);
      }
    };

    fetchDurations();
    genre?.songs.forEach((song) => {
      totalViews += song?.views || 0;
    });
  }, [genre?.songs]);

  return (
    <ResponsiveContainer>
      <CardContainer>
        {loading ? (
          <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />
        ) : (
          <>
            <CardImage>
              <CardItem item={genre} />
            </CardImage>
            <BoxCentered>
              <StyledTextHeader>{genre?.title}</StyledTextHeader>
              <Box>Cập nhật: {moment(genre?.created_at).format('YYYY-MM-DD')}</Box>
              {/* lấy data singers từ useState ra và max 4 ca sĩ */}
              {/* sau này thêm field likes */}
              <Box>{totalViews} Views</Box>
              <Button
                sx={{ borderRadius: '18px' }}
                onClick={() => {
                  if (!album?.songs || album?.songs?.length === 0) setError('Album không có bài hát');
                  const randomSong = album?.songs ? album.songs[Math.floor(Math.random() * album.songs?.length)] : null;
                  setCurrentSong(randomSong || null);
                }}
                variant="contained"
                startIcon={<PlayArrow />}
              >
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
              ? Array.from({ length: genre?.songs?.length || 0 }, (_, index) => <PlaylistItemSkeleton key={index} />)
              : genre?.songs.map((song, index) => (
                  <PlaylistItem key={index}>
                    <SongTitle>
                      <Headphones sx={{ marginRight: '8px' }} />
                      <StyledBox>
                        <StyledBoxTitle>{song.title}</StyledBoxTitle>
                        <StyledBoxTitle>{song?.singers?.[0]?.name}</StyledBoxTitle>
                      </StyledBox>
                    </SongTitle>
                    <AlbumTitle>{genre?.title}</AlbumTitle>
                    <StyledGroupAction>
                      {!song?.liked ? (
                        <Tooltip placement="top" title="Yêu thích">
                          <IconButton onClick={() => handleToggleLike(song.id, song?.liked)}>
                            <FavoriteBorder />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip placement="top" title="Bỏ Yêu thích">
                          <IconButton onClick={() => handleToggleLike(song.id, song?.liked)}>
                            <Favorite />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip placement="top" title="Phát">
                        <IconButton
                          onClick={() => {
                            if (!album?.songs || album?.songs?.length === 0) setError('Album không có bài hát');
                            const randomSong = album?.songs
                              ? album?.songs[Math.floor(Math.random() * album?.songs.length)]
                              : null;
                            setCurrentSong(song);
                            setTempCurrentSong(randomSong);
                          }}
                        >
                          <PlayCircleOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement="top" title="Khác">
                        <IconButton onClick={handleOpenMoreAction}>
                          <MoreHoriz />
                        </IconButton>
                      </Tooltip>
                      <Time>{songDurations[index]}</Time>
                    </StyledGroupAction>
                  </PlaylistItem>
                ))}
          </>
        ) : (
          <>
            {loading
              ? Array.from({ length: album?.songs?.length || 0 }, (_, index) => <PlaylistItemSkeleton key={index} />)
              : album?.songs.map((song, index) => (
                  <PlaylistItem key={index}>
                    <SongTitle>
                      <Headphones style={{ marginRight: '8px' }} />
                      <Image src={song?.image} alt="Live from space album cover" />
                      <StyledBox>
                        <StyledBoxTitle>
                          <Typography variant="inherit" noWrap>
                            {song.title}
                          </Typography>
                        </StyledBoxTitle>
                        <StyledBoxTitle>{song?.singers?.[0]?.name}</StyledBoxTitle>
                      </StyledBox>
                      <StyleMoreButton>
                        <Tooltip placement="top" title="Khác">
                          <IconButton onClick={handleOpenMoreAction}>
                            <MoreVert />
                          </IconButton>
                        </Tooltip>
                      </StyleMoreButton>
                    </SongTitle>
                  </PlaylistItem>
                ))}
          </>
        )}
      </PlaylistContainer>
      {/* <MoreAction song={songData} />
      <SendEmail song={songData} /> */}
      <PlaylistModal />
    </ResponsiveContainer>
  );
};

export default GenreDetail;
