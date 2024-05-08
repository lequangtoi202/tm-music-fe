import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Playlist from '../../components/Playlist';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { PlaylistModal } from '../../components/PlaylistModal';
import { channel } from 'diagnostics_channel';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../utils/storage';
import YouTubePlayer from '../../components/Youtube';
const theme = createTheme();

function Rooms() {
  const localUser = getCurrentUser()
  const [tempIds, setTempIds] = useState<number[]>([]);
  const [ids, setIds] = useState<number[]>([])
  var user_id = 0
  if (localUser) {
    const user = JSON.parse(localUser)
    user_id = user.id
  }

  // const user_id = localUser ? localUser.id : 0

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
          uuid: 'c17a1cac-aebd-4c98-aefb-b28ac65f8ea7'
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
        if (data.message && data.message.user_id) {
          setTempIds(prevIds => [...prevIds, data.message.user_id]);
        }
        console.log('data: ', data);
      }
    };
  
    return () => {
      socket.close(); 
    };
  }, []);

  useEffect(() => {
    const socket = createSocket();
    
    const beforeUnloadHandler = (event: any) => {
      const msg = {
        command: 'unsubscribed',
        identifier: JSON.stringify({
          channel: 'RoomChannel',
          user_id: user_id,
          uuid: 'c17a1cac-aebd-4c98-aefb-b28ac65f8ea7'
        })
      };
      socket.send(JSON.stringify(msg));
    };

    // Gắn sự kiện beforeunload
    window.addEventListener('beforeunload', beforeUnloadHandler);

    // Cleanup: Gỡ bỏ sự kiện beforeunload khi component unmount
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  useEffect(() => {
    if (tempIds.length > 0) {
      setIds(prevIds => [...prevIds, ...tempIds]);
      setTempIds([]);
    }
  }, [tempIds]);

  console.log('ids: ', ids)

  return (
    <div>
      <div className="youtube-video">
        {/* <iframe 
          src='https://www.youtube.com/embed/ljyzAQZjGvQ?autoplay=1&t=1225s'
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'
          style={{ pointerEvents: 'none' }} 
        /> */}
      </div>
      {/* <YouTubePlayer videoId="QmzNJjGAT9Q" /> */}

    </div>
  );
}

export default Rooms;
