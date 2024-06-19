import {
  Comment,
  Lyrics,
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { Box, Card, IconButton, Slider, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import { formatTime } from '../../utils/time';
import Image from '../Image';
import Snackbars from '../Snackbar';
import { CustomCardContent, CustomDisplayControl } from './styles';
import images from '../../assets/images';
import { setTempCurrentSong } from '../../utils/storage';

export default function MediaControlCard() {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(300);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [disablePlay, setDisablePlay] = useState<boolean>(false);
  const [prevVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState(false);
  const {
    isMobile,
    currentSong,
    currentAlbum,
    setCurrentSong,
    setOpenCommentDialog,
    error,
    success,
    setError,
    setIsShowLyric,
  } = useContext(KContext);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    const newVolume = newValue as number;
    if (audio) {
      audio.volume = newVolume / 100;
    }
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audio) {
      audio.currentTime = currentTime;
    }
    setCurrentTime(newValue as number);
  };

  const togglePlayPause = () => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (typeof prevTime === 'number') {
            return Math.min(prevTime + 1, duration);
          }
          return prevTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    if (currentSong) {
      const audio = new Audio(currentSong.audio);
      audio.onloadedmetadata = () => {
        const maxDuration = Math.floor(audio.duration);
        setDuration(maxDuration);
      };
      // const [minutes, seconds] = currentSong.duration.split(':').map(Number);
      // const maxDuration = minutes * 60 + seconds;

      setCurrentTime(0);
      setIsMuted(false);
      setDisablePlay(false);
    } else {
      setDisablePlay(true);
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong?.bought && currentSong?.copyright && currentTime === 60) {
      setDisablePlay(true);
      setIsPlaying(false);
      const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
      audio.pause();
      setError('Vui lòng mua bài hát.');
    }
  }, [currentTime]);

  const handleIconClick = () => {
    const newIsMuted = !isMuted;
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audio && newIsMuted) {
      audio.volume = 0;
    } else {
      audio.volume = prevVolume / 100;
    }
    setIsMuted(newIsMuted);
    setVolume(newIsMuted ? 0 : prevVolume);
  };

  const playPreviousSong = () => {
    if (currentAlbum && currentAlbum.songs && currentSong) {
      const currentIndex = currentAlbum.songs.findIndex((song) => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + currentAlbum.songs?.length) % currentAlbum.songs?.length;
      const prevSong = currentAlbum.songs[prevIndex];
      setCurrentSong(prevSong);
      setTempCurrentSong(prevSong);
    }
  };

  const playNextSong = () => {
    if (currentAlbum && currentAlbum.songs && currentSong) {
      const currentIndex = currentAlbum.songs.findIndex((song) => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % currentAlbum.songs?.length;
      const nextSong = currentAlbum.songs[nextIndex];
      setCurrentSong(nextSong);
      setTempCurrentSong(nextSong);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
        height: '100px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          flex: '1 1 30%',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomCardContent>
          <Image src={currentSong?.image ?? images.noImage} alt="Live from space album cover" />
          <Box sx={{ pl: 1 }}>
            <Typography component="div" variant="h5">
              {currentSong?.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {currentSong?.genre?.title}
            </Typography>
          </Box>
        </CustomCardContent>
      </Box>
      <CustomDisplayControl>
        <Box sx={{ flex: '1 1 65%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip placement="top" title="Trước đó">
            <IconButton aria-label="previous" onClick={playPreviousSong}>
              {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Phát">
            <IconButton disabled={disablePlay} aria-label="play/pause" onClick={togglePlayPause}>
              {isPlaying ? <Pause sx={{ height: 38, width: 38 }} /> : <PlayArrow sx={{ height: 38, width: 38 }} />}
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Tiếp theo">
            <IconButton aria-label="next" onClick={playNextSong}>
              {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
            </IconButton>
          </Tooltip>
          <audio
            id="audioPlayer"
            {...(isPlaying ? { autoPlay: true } : {})}
            // controls={true}
            src={currentSong?.audio}
          />
        </Box>
        {!isMobile && (
          <Box sx={{ flex: '1 1 35%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ mr: 2 }}>{formatTime(currentTime)}</Box>
            <Slider
              disabled={disablePlay}
              sx={{ color: '#1976d2' }}
              value={currentTime}
              max={duration}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => formatTime(value)}
            />
            <Box sx={{ ml: 2 }}>{formatTime(duration)}</Box>
          </Box>
        )}
      </CustomDisplayControl>

      {!isMobile && (
        <Box sx={{ flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip placement="top" title="Bình luận">
            <IconButton
              aria-label="Comment"
              onClick={() => {
                if (!currentSong) {
                  setError('Vui lòng chọn bài hát');
                } else {
                  setOpenCommentDialog(true);
                }
              }}
            >
              <Comment />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Lời bài hát">
            <IconButton
              aria-label="Lyric"
              onClick={() => {
                setIsShowLyric(true);
              }}
            >
              <Lyrics />
            </IconButton>
          </Tooltip>
          <Stack spacing={2} direction="row" sx={{ mb: 1, width: '35%' }} alignItems="center">
            {isMuted && volume <= 0 ? (
              <VolumeOff onClick={handleIconClick} sx={{ cursor: 'pointer' }} />
            ) : !isMuted && volume === 100 ? (
              <VolumeUp onClick={handleIconClick} sx={{ cursor: 'pointer' }} />
            ) : (
              <VolumeDown onClick={handleIconClick} sx={{ cursor: 'pointer' }} />
            )}
            <Slider
              aria-label="Volume"
              sx={{ color: '#1976d2' }}
              value={volume}
              max={100}
              valueLabelDisplay="auto"
              onChange={handleChange}
            />
          </Stack>
        </Box>
      )}

      {error && <Snackbars status="error" open={true} message={error} />}
      {success && <Snackbars status="success" open={true} message={success} />}
    </Card>
  );
}
