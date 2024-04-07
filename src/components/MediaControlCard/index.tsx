import { Comment, Lyrics, VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Slider, Stack, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import { formatTime } from '../../utils/time';
import Image from '../Image';
import { CustomCardContent, CustomDisplayControl } from './styles';

export default function MediaControlCard() {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState<number | number[]>(0);
  const [duration, setDuration] = useState<number>(300);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [prevVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState(false);
  const { isMobile, currentSong, currentAlbum, setCurrentSong, setOpenCommentDialog } = useContext(KContext);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const newVolume = newValue as number;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setCurrentTime(newValue as number);
  };

  const togglePlayPause = () => {
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
      const [minutes, seconds] = currentSong.duration.split(':').map(Number);
      const maxDuration = minutes * 60 + seconds;

      setCurrentTime(0);
      setDuration(maxDuration);
      setIsPlaying(true);
      setIsMuted(false);
    }
  }, [currentSong]);

  const handleIconClick = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    setVolume(newIsMuted ? 0 : prevVolume);
  };

  const playPreviousSong = () => {
    if (currentAlbum && currentSong) {
      const currentIndex = currentAlbum.songs.findIndex((song) => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + currentAlbum.songs.length) % currentAlbum.songs.length;
      const prevSong = currentAlbum.songs[prevIndex];
      setCurrentSong(prevSong);
    }
  };

  const playNextSong = () => {
    if (currentAlbum && currentSong) {
      const currentIndex = currentAlbum.songs.findIndex((song) => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % currentAlbum.songs.length;
      const nextSong = currentAlbum.songs[nextIndex];
      setCurrentSong(nextSong);
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
          <Image src={currentSong?.logo} alt="Live from space album cover" />
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
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Phát">
            <IconButton aria-label="play/pause" onClick={togglePlayPause}>
              {isPlaying ? (
                <PauseIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Tiếp theo">
            <IconButton aria-label="next" onClick={playNextSong}>
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        {!isMobile && (
          <Box sx={{ flex: '1 1 35%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ mr: 2 }}>{formatTime(currentTime)}</Box>
            <Slider
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
            <IconButton aria-label="Comment" onClick={() => setOpenCommentDialog(true)}>
              <Comment />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Lời bài hát">
            <IconButton aria-label="Lyric">
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
    </Card>
  );
}
