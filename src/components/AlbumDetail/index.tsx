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
import { IGenre } from '../../types/Genre';
import { ISong } from '../../types/Song';
import { setTempCurrentSong } from '../../utils/storage';
import CardItem from '../Card';
import Image from '../Image';
import { MoreAction } from '../MoreAction';
import { SendEmail } from '../OTP/SendEmailModal';
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
import { createLike, getAllAlbums, unlike, getAlbumDetail } from '../../services/user';

const AlbumDetail = () => {
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [singers, setSingers] = useState<{}[]>([]);
  const [likedSongs, setLikedSongs] = useState<Record<number, boolean>>({});
  const { setCurrentSong, setCurrentAlbum, isMobile, setIsOpenMoreAction, setIsOpenSendToEmail } = useContext(KContext);
  const { albumId } = useParams<{ albumId?: string }>()
  const albumData: IAlbum = {
    image: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    id: 3,
    description: 'Description of Night view album',
    songs: [],
    liked: false,
    created_at: new Date().toISOString(),
    owner: false,
  };
  const handleOpenMoreAction = () => {
    setIsOpenMoreAction(true);
  };

  let totalViews: number = 0;

  const handleToggleLike = async (id: number, liked: any) => {
    if (!liked) {
      await createLike([id], 'song_ids');
      setLikedSongs({ ...likedSongs, [id]: true });
    } else {
      await unlike([id], 'song_ids');
      setLikedSongs({ ...likedSongs, [id]: false });
    }
  };

  useEffect(() => {
    const fetchData = async (id: any) => {
      const data = await getAlbumDetail(id)
      setAlbum(data)
    };

    fetchData(albumId);  
  }, [albumId]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      // const res = await getAlbumDetail(albumId || '');
      // setAlbum(res.data);
      // setSingers(res.data.singers);
    };

    fetchData();
  }, [albumId]);

  const mockGenre: IGenre = {
    title: 'Pop',
    id: 1,
    description:
      'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
    songs: [],
    image: 'https://example.com/pop-genre',
  };

  const songData: ISong = {
    id: 3,
    title: 'Night view',
    lyric: 'Lyrics of the song',
    release_date: '2024-03-06',
    duration: '3:30',
    views: 100,
    track_number: 1,
    image: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    audio: 'path/to/song/file.mp3',
    genre: mockGenre,
    singers: [],
    liked: false,
    owner: true,
  };

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
        resolve("0:00");
      };
    });
  };

  const [songDurations, setSongDurations] = useState<string[]>([]);

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const promises = album?.songs?.map(song => handleDuration(song.audio)) || [];
        const durations = await Promise.all(promises);
        setSongDurations(durations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching song durations:", error);
      }
    };

    fetchDurations();
    album?.songs.forEach(song => {
      totalViews += song?.views || 0;
    });
  }, [album?.songs]);
  

  return (
    <ResponsiveContainer>
      <CardContainer>
        {loading ? (
          <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />
        ) : (
          <>
            <CardImage>
              <CardItem item={album} />
            </CardImage>
            <BoxCentered>
              <StyledTextHeader>{album?.title}</StyledTextHeader>
              {/* sau này thêm field createdDate */}
              <Box>Cập nhật: {moment(album?.created_at).format('YYYY-MM-DD')}</Box>
              {/* lấy data singers từ useState ra và max 4 ca sĩ */}
              {/* sau này thêm field likes */}
              <Box>{totalViews} Views</Box>
              <Button
                sx={{ borderRadius: '18px' }}
                onClick={() => {
                  const randomSong = album?.songs[Math.floor(Math.random() * album?.songs?.length)];
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
              ?  Array.from({ length: album?.songs?.length || 0 }, (_, index) => <PlaylistItemSkeleton key={index} />)
              : album?.songs.map((song, index) => (
                  <PlaylistItem key={index}>
                    <SongTitle>
                      <Headphones sx={{ marginRight: '8px' }} />
                      <StyledBox>
                        <StyledBoxTitle>{song.title}</StyledBoxTitle>
                        <StyledBoxTitle>{song?.singers?.[0]?.name}</StyledBoxTitle>
                      </StyledBox>
                    </SongTitle>
                    <AlbumTitle>{album?.title}</AlbumTitle>
                    <StyledGroupAction>
                      {/* Nhớ sửa số 1 thành item.id */}
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
                            const randomSong = album?.songs[Math.floor(Math.random() * album.songs.length)];
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
              ? Array.from({ length: album?.songs?.length || 0  }, (_, index) => <PlaylistItemSkeleton key={index} />)
              : album?.songs.map((song, index) => (
                  <PlaylistItem key={index}>
                    <SongTitle>
                      <Headphones style={{ marginRight: '8px' }} />
                      <Image
                        src={song?.image}
                        alt="Live from space album cover"
                      />
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
      <MoreAction song={songData} />
      <SendEmail song={songData} />
      <PlaylistModal />
    </ResponsiveContainer>
  );
};

export default AlbumDetail;
