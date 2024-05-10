import { useEffect, useRef, useState } from 'react';
import { getCurrentUser } from '../../utils/storage';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, IconButton, Grid, AppBar, Toolbar, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const commentsData = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: 'https://via.placeholder.com/150',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

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

const RoomDetail: React.FC = () => {
  const classes = useStyles();
  const { uuid } = useParams();

  const [comments, setComments] = useState(commentsData);
  const [message, setMessage] = useState('');
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [comments]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const newComment = {
      id: comments.length + 1,
      name: 'Your Name',
      image: 'https://via.placeholder.com/150',
      content: message,
    };

    setComments([...comments, newComment]);
    setMessage('');
  };

  const [views, setViews] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(-1);

  const [tempIds, setTempIds] = useState<number[]>([]);
  const [ids, setIds] = useState<number[]>([]);
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
    const socket = createSocket();
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (data.type !== 'ping') {
        if (data.message && data.message.total_user) {
          setTempIds(prevIds => [...prevIds, data.message.user_id]);
          setViews(data.message.total_user)
        }
        if (currentTime === -1 &&  data.message && data.message.room && data.message.room.current_time) {
          setCurrentTime(data.message.room.current_time)
        }
        console.log(`data:`, data);
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
  
  console.log('views: ', views)
  console.log('currentTime: ', currentTime)


  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div className={classes.videoContainer}>
            <iframe
              className={classes.videoIframe}
              src={`https://www.youtube.com/embed/ljyzAQZjGvQ?autoplay=1&start=${currentTime}`}
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
              {comments.map((comment, index) => (
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
                value={message}
                onChange={handleMessageChange}
                multiline
              />
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>

        </Grid>
      </Grid>
      <Link to={`/rooms/`} className="link">
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
