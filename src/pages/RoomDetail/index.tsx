// @ts-nocheck

import { Headphones, PlayCircleOutline, Send } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongsInRoom } from '../../services/user';
import { getCurrentUser } from '../../utils/storage';
import {
  PlaylistContainer,
  PlaylistItem,
  SongTitle,
  StyleCommentSection,
  StyleMoreButton,
  StyledAudio,
  StyledBox,
  StyledBoxTitle,
  StyledCommentInput,
} from './styles';
import { KContext } from '../../context';
import Image from '../../components/Image';
import images from '../../assets/images';
import Waveform from '../../components/WaveVisualize';
const theme = createTheme();
let socket = null;

const RoomDetail: React.FC = () => {
  const audioRef = useRef(null);
  const { uuid } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatListRef = useRef<HTMLUListElement>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [url, setUrl] = useState<string>('');
  const [ownerRoomId, setOwnerRoomId] = useState<number>(-1);
  const [songsInRoom, setSongsInRoom] = useState<any[]>([]);
  const { setCurrentSong } = useContext(KContext);
  const lastMessageRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);
  const user_id = (() => {
    const localUser = getCurrentUser();
    if (localUser) {
      const user = JSON.parse(localUser);
      return user.id;
    }
    return 0;
  })();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ownerRoomId === -1) {
        window.location.reload();
      }
    }, 2000)

    return () => clearTimeout(timer);
  }, [ownerRoomId])

  const createSocket = () => {
    const socket_url = 'ws://localhost:3000/cable';
    const socket = new WebSocket(socket_url);

    socket.onopen = function (event) {
      console.log('Connect to server');
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: uuid,
        }),
      };
      socket.send(JSON.stringify(msg));
    };

    // socket.onmessage = function(event) {
    //   const data = JSON.parse(event.data);
    //   if (data.type === 'ping') {
    //     return;
    //   }
    // };

    // socket.onclose = function(event) {
    //   console.log('Disconnected from server');
    // };

    // socket.onerror = function(error) {
    //   console.log('WebSocket error observed: ', error);
    // };

    return socket;
  };
  useEffect(() => {
    socket = createSocket();
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type !== 'ping') {
        if (data.message?.total_user) {
          setUrl(data.message?.room?.url);
          setOwnerRoomId(data.message?.room?.owner_id);
        }
        if (currentTime === 0 && data.message?.room?.current_time) {
          setCurrentTime(data.message.room.current_time);
        }

        if (data?.message?.room?.url && url !== data.message.room.url) {
          setUrl(data.message.room.url);
        }
      }
      if (data.message?.type === 'chat_message') {
        const user_data = data?.message?.user_data;
        const message = {
          id: user_data.id,
          name: user_data.first_name + ' ' + user_data.last_name,
          image: user_data.image,
          content: user_data.message,
        };
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      if (data.message?.type === 'change_url') {
        setUrl(data.message?.room?.url);
        setCurrentTime(data.message?.room?.current_time);
      }
    };

    getDataSongsInRoom(uuid);

    const beforeUnloadHandler = (event: any) => {
      const msg = {
        command: 'unsubscribed',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: uuid,
        }),
      };
      socket.send(JSON.stringify(msg));
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);

    return () => {
      socket.close();
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  const getDataSongsInRoom = async (id: any) => {
    const data = await getSongsInRoom(id);
    setSongsInRoom(data);
  };

  const sendMessage = () => {
    if (newMessage !== '') {
      if (socket.readyState === WebSocket.OPEN) {
        const msg = {
          command: 'message',
          identifier: JSON.stringify({
            channel: 'RoomChannel',
            user_id: user_id,
            uuid: uuid,
          }),
          data: JSON.stringify({ action: 'chat_message', text: newMessage }),
        };
        socket.send(JSON.stringify(msg));
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        setNewMessage('');
      } else {
        console.log('Kết nối chưa được mở. Đang thử lại sau.');
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleButtonClickSongs = async (url: string) => {
    const videoDuration = await getVideoDuration(url);
    console.log('videoDuration: ', videoDuration);
    if (socket.readyState === WebSocket.OPEN) {
      const msg = {
        command: 'message',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: uuid,
        }),
        data: JSON.stringify({ action: 'change_url', url: url, total_time: videoDuration }),
      };
      socket.send(JSON.stringify(msg));
    } else {
      console.log('Kết nối chưa được mở. Đang thử lại sau.');
    }
  };

  const getVideoDuration = (url) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        resolve(Math.floor(video.duration));
      });
      video.addEventListener('error', () => {
        resolve(0);
      });
    });
  };

  // useEffect(() => {
  //   const playAudio = async () => {
  //     if (audioRef.current) {
  //       audioRef.current.currentTime = currentTime;
  //       try {
  //         await audioRef.current.play();
  //       } catch (error) {
  //         console.error('Failed to play audio:', error);
  //       }
  //     }
  //   };

  //   document.addEventListener('click', playAudio);

  //   return () => {
  //     document.removeEventListener('click', playAudio);
  //   };
  // }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTime !== 0) {
      audio.currentTime = currentTime; // Set to start at the received time
      audio.play();
    }
  }, [currentTime]);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box p={2}>
          <PlaylistContainer>
            {songsInRoom.map((song, index) => (
              <PlaylistItem key={index}>
                <SongTitle>
                  <Headphones sx={{ marginRight: '8px' }} />
                  <Image src={song?.image ?? images.noImage} alt="Live" />
                  <StyledBox>
                    <StyledBoxTitle>
                      <Typography variant="inherit" noWrap>
                        {song.title}
                      </Typography>
                    </StyledBoxTitle>
                    <StyledBoxTitle>{song?.singers?.[0]?.name}</StyledBoxTitle>
                  </StyledBox>
                  <StyleMoreButton>
                    <Tooltip placement="top" title={ownerRoomId !== user_id ? 'Bạn không phải chủ phòng' : 'Phát'}>
                      <span>
                        <IconButton
                          disabled={ownerRoomId !== user_id}
                          onClick={() => handleButtonClickSongs(song.audio)}
                        >
                          <PlayCircleOutline />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </StyleMoreButton>
                </SongTitle>
              </PlaylistItem>
            ))}
          </PlaylistContainer>
          <StyledAudio>
            <audio id="audioPlayer" autoPlay controls={true} src={url} ref={audioRef} />
          </StyledAudio>

          <Box mb={2} display={'flex'} flexDirection={'column'} maxHeight={'calc(100vh - 64px)'} overflowy={'auto'}>
            <div>
              <Typography variant="h6">Trò chuyện</Typography>
            </div>
            <div style={{ flex: 1 }}>
              <StyleCommentSection>
                <List ref={chatListRef}>
                  {messages.map((comment, index) => (
                    <ListItem
                      key={index}
                      sx={{ pl: 0, pr: 0 }}
                      ref={index === messages.length - 1 ? lastMessageRef : null}
                    >
                      <ListItemAvatar>
                        <Avatar alt={comment.name} src={comment.image ?? images.noImage} />
                      </ListItemAvatar>
                      <ListItemText primary={comment.name} secondary={comment.content} />
                    </ListItem>
                  ))}
                </List>
              </StyleCommentSection>
              <StyledCommentInput>
                <TextField
                  label="Bạn muốn nói gì?"
                  variant="outlined"
                  value={newMessage}
                  fullWidth
                  onChange={(e) => {
                    if (e.target.value !== '') {
                      setDisabled(false);
                      setNewMessage(e.target.value);
                    } else {
                      setNewMessage('');
                      setDisabled(true);
                    }
                  }}
                  onKeyUp={handleKeyPress}
                  multiline
                />
                <IconButton disabled={disabled} color="primary" onClick={sendMessage}>
                  <Send />
                </IconButton>
              </StyledCommentInput>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default RoomDetail;
