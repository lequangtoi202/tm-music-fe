// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { getCurrentUser } from '../../utils/storage';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, IconButton, Grid, AppBar, Toolbar, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  videoIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  commentSection: {
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  textField: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  appBar: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  padding0: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0)
  }
}));

let socket = null;

const RoomDetail: React.FC = () => {
  const classes = useStyles();
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
  const [newUrl, setNewUrl] = useState<string>('');
  const [ownerRoomId, setOwnerRoomId] = useState<number>(-1);

  const user_id = (() => {
    const localUser = getCurrentUser();
    if (localUser) {
      const user = JSON.parse(localUser);
      return user.id;
    }
    return 0;
  })();

  const createSocket = () => {
    const socket_url = 'ws://localhost:3000/cable';
    const socket = new WebSocket(socket_url);
  
    socket.onopen = function(event) {
      console.log('Connect to server');
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: uuid
        })
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
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (data.type !== 'ping') {
        if (data.message?.total_user) {
          setViews(data.message.total_user)
          setUrl(data.message?.room?.url)
          setOwnerRoomId(data.message?.room?.owner_id)
        }
        if (currentTime === 0 && data.message?.room?.current_time) {
          setCurrentTime(data.message.room.current_time)
        }

        if ( data?.message?.room?.url && url !== data.message.room.url) {
          setUrl(data.message.room.url)
        }
        console.log(`data:`, data);
      }
      if (data.message?.type === 'chat_message') {
        const user_data = data?.message?.user_data
        const message = {
          id: user_data.id,
          name: user_data.first_name + ' ' + user_data.last_name,
          image: user_data.image,
          content: user_data.message
        };
        setMessages(prevMessages => [...prevMessages, message]);
      }
      if (data.message?.type === 'change_url') {
        setUrl(data.message?.room?.url)
        setCurrentTime(data.message?.room?.current_time)
      }
    };
  
    const beforeUnloadHandler = (event: any) => {
      const msg = {
        command: 'unsubscribed',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: uuid
        })
      };
      socket.send(JSON.stringify(msg));
    };
  
    window.addEventListener('beforeunload', beforeUnloadHandler);
  
    return () => {
      socket.close();
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  const sendMessage = () => {
    if (socket.readyState === WebSocket.OPEN) {
      const msg = {
        command: 'message',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: uuid
        }),
        data: JSON.stringify({action: "chat_message", text: newMessage })
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

  const handleButtonClick = () => {
    if (socket.readyState === WebSocket.OPEN) {
      const msg = {
        command: 'message',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: uuid
        }),
        data: JSON.stringify({action: "change_url", url: newUrl })
      };
      socket.send(JSON.stringify(msg));
      setNewUrl('')
    } else {
      console.log('Kết nối chưa được mở. Đang thử lại sau.');
    }
  }
  console.log('url: ',url)
  console.log('currentTime: ',currentTime)


  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div className={classes.videoContainer}>
            <iframe
              className={classes.videoIframe}
              src={`https://www.youtube.com/embed/${url}?autoplay=1&start=${currentTime}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              // style={{ pointerEvents: 'none' }}
            />
          </div>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Room Detail
              </Typography>
              <Typography variant="body2">Views {views}</Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={3} container>
        <div className={classes.commentSection} style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Typography variant="h6">Chat</Typography>
          </div>
          <div style={{ flex: 1 }}>
            <List ref={chatListRef}>
              {messages.map((comment, index) => (
                <ListItem key={index} className={classes.padding0}>
                  <ListItemAvatar>
                    <Avatar alt={comment.name} src={comment.image} />
                  </ListItemAvatar>
                  <ListItemText primary={comment.name} secondary={comment.content} />
                </ListItem>
              ))}
            </List>
            <div className={classes.inputContainer}>
              <TextField
                label="Type your message"
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
              />
              <IconButton color="primary" onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>

        </Grid>
      </Grid>
      { ownerRoomId == user_id ? 
        <div className={classes.button}>
          <TextField
            label="New Input"
            variant="outlined"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            onClick={handleButtonClick}
          >
            Change
          </Button>

        </div> : <></>}
      
      <Link to={`/rooms/`} className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<ExitToAppIcon />}
        >
          Exit Room
        </Button>
      </Link>
    </div>
  );
}

export default RoomDetail;
