// @ts-nocheck

import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../utils/storage';
import { ExitToApp, Send } from '@mui/icons-material';
import { getSongsInRoom } from '../../services/user';
const theme = createTheme();
let socket = null;

const RoomDetail: React.FC = () => {
  const audioRef = useRef(null);
  const { uuid } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const [views, setViews] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [url, setUrl] = useState<string>('');
  const [ownerRoomId, setOwnerRoomId] = useState<number>(-1);
  const [songsInRoom, setSongsInRoom] = useState<any[]>([]);

  const user_id = (() => {
    const localUser = getCurrentUser();
    if (localUser) {
      const user = JSON.parse(localUser);
      return user.id;
    }
    return 0;
  })();

  useEffect(() => {
    const setCurrentTimeAndPlay = (time) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
        audioRef.current.play();
      }
    };

    const timeoutId = setTimeout(() => {
      setCurrentTimeAndPlay(currentTime + 3);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [currentTime]);

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
          setViews(data.message.total_user);
          setUrl(data.message?.room?.url);
          setOwnerRoomId(data.message?.room?.owner_id);
        }
        if (currentTime === 0 && data.message?.room?.current_time) {
          setCurrentTime(data.message.room.current_time);
        }

        if (data?.message?.room?.url && url !== data.message.room.url) {
          setUrl(data.message.room.url);
        }
        console.log(`data:`, data);
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

    getDataSongsInRoom(uuid)

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
  }
  console.log('songInRoom: ', songsInRoom)

  const sendMessage = () => {
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
      setNewMessage('');
    } else {
      console.log('Kết nối chưa được mở. Đang thử lại sau.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleButtonClickSongs = async (url: string) => {
    const videoDuration = await getVideoDuration(url);
    console.log('videoDuration: ', videoDuration)
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
      setNewUrl('');
    } else {
      console.log('Kết nối chưa được mở. Đang thử lại sau.');
    }
  };

  const getVideoDuration = (url) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = 'https://vnso-pt-15-tf-a128-z3.zmdcdn.me/756ba39ea07eb46c326b54c999668a94?authen=exp=1716058741~acl=/756ba39ea07eb46c326b54c999668a94/*~hmac=8322462b2f81ebbaef181e2dcc9dbad2';
      video.addEventListener('loadedmetadata', () => {
        resolve(Math.floor(video.duration));
      });
      video.addEventListener('error', () => {
        resolve(0);
      });
    });
  };

  return (
    <Box>
      {songsInRoom.length > 0 &&
        songsInRoom.map((result, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ marginRight: '10px' }}>{result.title}</span>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleButtonClickSongs(result.audio)}
            >
              Click Me
            </Button>
          </div>
        ))}

        <div>
        <audio
          id="audioPlayer"
          autoPlay
          controls={true}
          src={url}
          ref={audioRef}
        />
        </div>

        <Box mb={2} display={'flex'} flexDirection={'column'} maxHeight={'calc(100vh - 64px)'} overFlowY={'auto'}>
          <div>
            <Typography variant="h6">Trò chuyện</Typography>
          </div>
          <div style={{ flex: 1 }}>
            <List ref={chatListRef}>
              {messages.map((comment, index) => (
                <ListItem key={index} sx={{ pl: 0, pr: 0 }}>
                  <ListItemAvatar>
                    <Avatar alt={comment.name} src={comment.image} />
                  </ListItemAvatar>
                  <ListItemText primary={comment.name} secondary={comment.content} />
                </ListItem>
              ))}
            </List>
            <Box mt={2} display={'flex'} alignItems={'center'}>
              <TextField
                label="Type your message"
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyUp={handleKeyPress}
                multiline
              />
              <IconButton color="primary" onClick={sendMessage}>
                <Send />
              </IconButton>
            </Box>
          </div>
        </Box>
    </Box>

  );
};

export default RoomDetail;
