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
const theme = createTheme();
let socket = null;

const RoomDetail: React.FC = () => {
  const audioRef = useRef(null);
  const { uuid } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatListRef = useRef<HTMLUListElement>(null);
  const [views, setViews] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [url, setUrl] = useState<string>('');
  const [ownerRoomId, setOwnerRoomId] = useState<number>(-1);
  const [songsInRoom, setSongsInRoom] = useState<any[]>([]);
  const { setCurrentSong } = useContext(KContext);
  const lastMessageRef = useRef<HTMLLIElement | null>(null);

  console.log('ownerRoomId: ',ownerRoomId)
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
    // setSongsInRoom([
    //   {
    //     id: 424,
    //     title: 'Để Mị Nói Cho Mà Nghe',
    //     lyric:
    //       'Để Mị nói cho mà nghe\n      Tâm hồn này chẳng để lặng lẽ\n      Thương cha thương mẹ thương thì thương vậy thôi\n      Thương mình chẳng thời ai khóc mướn mà lo\n      Còn chuyện người ta cứ để người ta tính\n      Đời mình đâu có dài mà héo hon vì ai\n      Ở đời nhiều khi ngây ngô nhưng ừ thì là mơ',
    //     release_date: null,
    //     duration: null,
    //     views: 75000001,
    //     track_number: null,
    //     image: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/2/5/3/7/2537435f53acd84f833ac5f82575899d.jpg',
    //     audio:
    //       'https://res.cloudinary.com/dx9vr7on4/video/upload/v1715921803/music_kl/son%20tung/be642984985c390011bf2b02d6c0f5cb_u2yj7a.mp3',
    //     liked: false,
    //     singers: [
    //       {
    //         id: 124,
    //         name: 'Hoàng Thùy Linh',
    //         tag: 'singer',
    //         description:
    //           "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //         birthdate: '1988-08-11',
    //         created_at: '2024-05-17T13:02:22.759Z',
    //         updated_at: '2024-05-17T13:02:22.759Z',
    //         image:
    //           'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //       },
    //     ],
    //     owner: null,
    //     genre: {
    //       id: 25,
    //       title: 'Nhạc Trẻ',
    //       description:
    //         'Nhạc trẻ là thể loại âm nhạc phổ biến nhất ở Việt Nam, thường kết hợp giữa các yếu tố của pop, dance và ballad. Nó thường thể hiện những câu chuyện về tình yêu, cuộc sống hàng ngày và tâm trạng của giới trẻ.',
    //       image:
    //         'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/0/2/7/602715b10214ef6af7e9fadbb87a21c4.jpg',
    //       songs: null,
    //       singers: [
    //         {
    //           id: 123,
    //           name: 'Sơn Tùng M-TP',
    //           tag: 'singer',
    //           description:
    //             "Một trong những ca sĩ nổi tiếng nhất Việt Nam hiện nay, nổi tiếng với phong cách âm nhạc độc đáo và các bản hit như 'Em Của Ngày Hôm Qua', 'Lạc Trôi'.",
    //           birthdate: '1994-07-05',
    //           created_at: '2024-05-17T13:02:22.748Z',
    //           updated_at: '2024-05-17T13:02:22.748Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 124,
    //           name: 'Hoàng Thùy Linh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //           birthdate: '1988-08-11',
    //           created_at: '2024-05-17T13:02:22.759Z',
    //           updated_at: '2024-05-17T13:02:22.759Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 125,
    //           name: 'Đen Vâu',
    //           tag: 'singer',
    //           description:
    //             "Rapper nổi tiếng với phong cách rap đời thường và các bài hát như 'Đưa Nhau Đi Trốn', 'Anh Đếch Cần Gì Nhiều Ngoài Em'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.765Z',
    //           updated_at: '2024-05-17T13:02:22.765Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/d/3/4/4d347aacb2be84d868dd6d25bb4aa503.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 126,
    //           name: 'Tóc Tiên',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách thời trang và âm nhạc hiện đại, các bài hát nổi bật gồm 'Ngày Mai', 'Big Girls Don't Cry'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.773Z',
    //           updated_at: '2024-05-17T13:02:22.773Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/2/0/9/2209495c8a8ad13a01f13fb60a5769d1.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 127,
    //           name: 'Min',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi bật với các bài hit như 'Có Em Chờ', 'Ghen', mang phong cách âm nhạc trẻ trung và hiện đại.",
    //           birthdate: '1988-12-07',
    //           created_at: '2024-05-17T13:02:22.780Z',
    //           updated_at: '2024-05-17T13:02:22.780Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/e/f/6/2ef6b4fc14d359656cde9d5e09842b57.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 128,
    //           name: 'Noo Phước Thịnh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi tiếng với giọng hát trữ tình và các bản hit như 'Cause I Love You', 'Như Phút Ban Đầu'.",
    //           birthdate: '1988-12-18',
    //           created_at: '2024-05-17T13:02:22.788Z',
    //           updated_at: '2024-05-17T13:02:22.788Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/0/7/e/c/07eca16c7f0a778b35d1a6f17f4f388f.jpg',
    //           followed: false,
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     id: 425,
    //     title: 'Bánh Trôi Nước',
    //     lyric:
    //       'Thân em vừa trắng lại vừa tròn\n        Bảy nổi ba chìm với nước non\n        Rắn nát mặc dầu tay kẻ nặn\n        Mà em vẫn giữ tấm lòng son',
    //     release_date: null,
    //     duration: null,
    //     views: 80000000,
    //     track_number: null,
    //     image: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/b/d/d/9/bdd946b0c2f68abb4d6c2ff9b7d400ac.jpg',
    //     audio:
    //       'https://res.cloudinary.com/dx9vr7on4/video/upload/v1715921855/music_kl/son%20tung/8092378f8087a00e487c6937d5005bb5_seiiae.mp3',
    //     liked: false,
    //     singers: [
    //       {
    //         id: 124,
    //         name: 'Hoàng Thùy Linh',
    //         tag: 'singer',
    //         description:
    //           "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //         birthdate: '1988-08-11',
    //         created_at: '2024-05-17T13:02:22.759Z',
    //         updated_at: '2024-05-17T13:02:22.759Z',
    //         image:
    //           'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //       },
    //     ],
    //     owner: null,
    //     genre: {
    //       id: 25,
    //       title: 'Nhạc Trẻ',
    //       description:
    //         'Nhạc trẻ là thể loại âm nhạc phổ biến nhất ở Việt Nam, thường kết hợp giữa các yếu tố của pop, dance và ballad. Nó thường thể hiện những câu chuyện về tình yêu, cuộc sống hàng ngày và tâm trạng của giới trẻ.',
    //       image:
    //         'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/0/2/7/602715b10214ef6af7e9fadbb87a21c4.jpg',
    //       songs: null,
    //       singers: [
    //         {
    //           id: 123,
    //           name: 'Sơn Tùng M-TP',
    //           tag: 'singer',
    //           description:
    //             "Một trong những ca sĩ nổi tiếng nhất Việt Nam hiện nay, nổi tiếng với phong cách âm nhạc độc đáo và các bản hit như 'Em Của Ngày Hôm Qua', 'Lạc Trôi'.",
    //           birthdate: '1994-07-05',
    //           created_at: '2024-05-17T13:02:22.748Z',
    //           updated_at: '2024-05-17T13:02:22.748Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 124,
    //           name: 'Hoàng Thùy Linh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //           birthdate: '1988-08-11',
    //           created_at: '2024-05-17T13:02:22.759Z',
    //           updated_at: '2024-05-17T13:02:22.759Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 125,
    //           name: 'Đen Vâu',
    //           tag: 'singer',
    //           description:
    //             "Rapper nổi tiếng với phong cách rap đời thường và các bài hát như 'Đưa Nhau Đi Trốn', 'Anh Đếch Cần Gì Nhiều Ngoài Em'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.765Z',
    //           updated_at: '2024-05-17T13:02:22.765Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/d/3/4/4d347aacb2be84d868dd6d25bb4aa503.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 126,
    //           name: 'Tóc Tiên',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách thời trang và âm nhạc hiện đại, các bài hát nổi bật gồm 'Ngày Mai', 'Big Girls Don't Cry'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.773Z',
    //           updated_at: '2024-05-17T13:02:22.773Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/2/0/9/2209495c8a8ad13a01f13fb60a5769d1.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 127,
    //           name: 'Min',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi bật với các bài hit như 'Có Em Chờ', 'Ghen', mang phong cách âm nhạc trẻ trung và hiện đại.",
    //           birthdate: '1988-12-07',
    //           created_at: '2024-05-17T13:02:22.780Z',
    //           updated_at: '2024-05-17T13:02:22.780Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/e/f/6/2ef6b4fc14d359656cde9d5e09842b57.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 128,
    //           name: 'Noo Phước Thịnh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi tiếng với giọng hát trữ tình và các bản hit như 'Cause I Love You', 'Như Phút Ban Đầu'.",
    //           birthdate: '1988-12-18',
    //           created_at: '2024-05-17T13:02:22.788Z',
    //           updated_at: '2024-05-17T13:02:22.788Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/0/7/e/c/07eca16c7f0a778b35d1a6f17f4f388f.jpg',
    //           followed: false,
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     id: 426,
    //     title: 'Kẻ Cắp Gặp Bà Già (Remix)',
    //     lyric:
    //       'Hồi còn nhỏ xíu cứ nghĩ yêu là trò chơi\n        Lúc lớn mới biết yêu là học đòi\n        Hồi còn nhỏ xíu cứ nghĩ yêu là chuyện vớ vẩn\n        Lớn rồi mới thấy chỉ vớ vẩn khi yêu người không ra gì',
    //     release_date: null,
    //     duration: null,
    //     views: 48000000,
    //     track_number: null,
    //     image: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/0/2/2/3/02233cfbdea8c3cf01583b4d88123f41.jpg',
    //     audio:
    //       'https://res.cloudinary.com/dx9vr7on4/video/upload/v1715921918/music_kl/son%20tung/3157308852649852305_jpsxnr.mp3',
    //     liked: false,
    //     singers: [
    //       {
    //         id: 124,
    //         name: 'Hoàng Thùy Linh',
    //         tag: 'singer',
    //         description:
    //           "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //         birthdate: '1988-08-11',
    //         created_at: '2024-05-17T13:02:22.759Z',
    //         updated_at: '2024-05-17T13:02:22.759Z',
    //         image:
    //           'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //       },
    //     ],
    //     owner: null,
    //     genre: {
    //       id: 25,
    //       title: 'Nhạc Trẻ',
    //       description:
    //         'Nhạc trẻ là thể loại âm nhạc phổ biến nhất ở Việt Nam, thường kết hợp giữa các yếu tố của pop, dance và ballad. Nó thường thể hiện những câu chuyện về tình yêu, cuộc sống hàng ngày và tâm trạng của giới trẻ.',
    //       image:
    //         'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/0/2/7/602715b10214ef6af7e9fadbb87a21c4.jpg',
    //       songs: null,
    //       singers: [
    //         {
    //           id: 123,
    //           name: 'Sơn Tùng M-TP',
    //           tag: 'singer',
    //           description:
    //             "Một trong những ca sĩ nổi tiếng nhất Việt Nam hiện nay, nổi tiếng với phong cách âm nhạc độc đáo và các bản hit như 'Em Của Ngày Hôm Qua', 'Lạc Trôi'.",
    //           birthdate: '1994-07-05',
    //           created_at: '2024-05-17T13:02:22.748Z',
    //           updated_at: '2024-05-17T13:02:22.748Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 124,
    //           name: 'Hoàng Thùy Linh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //           birthdate: '1988-08-11',
    //           created_at: '2024-05-17T13:02:22.759Z',
    //           updated_at: '2024-05-17T13:02:22.759Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 125,
    //           name: 'Đen Vâu',
    //           tag: 'singer',
    //           description:
    //             "Rapper nổi tiếng với phong cách rap đời thường và các bài hát như 'Đưa Nhau Đi Trốn', 'Anh Đếch Cần Gì Nhiều Ngoài Em'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.765Z',
    //           updated_at: '2024-05-17T13:02:22.765Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/d/3/4/4d347aacb2be84d868dd6d25bb4aa503.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 126,
    //           name: 'Tóc Tiên',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách thời trang và âm nhạc hiện đại, các bài hát nổi bật gồm 'Ngày Mai', 'Big Girls Don't Cry'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.773Z',
    //           updated_at: '2024-05-17T13:02:22.773Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/2/0/9/2209495c8a8ad13a01f13fb60a5769d1.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 127,
    //           name: 'Min',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi bật với các bài hit như 'Có Em Chờ', 'Ghen', mang phong cách âm nhạc trẻ trung và hiện đại.",
    //           birthdate: '1988-12-07',
    //           created_at: '2024-05-17T13:02:22.780Z',
    //           updated_at: '2024-05-17T13:02:22.780Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/e/f/6/2ef6b4fc14d359656cde9d5e09842b57.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 128,
    //           name: 'Noo Phước Thịnh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi tiếng với giọng hát trữ tình và các bản hit như 'Cause I Love You', 'Như Phút Ban Đầu'.",
    //           birthdate: '1988-12-18',
    //           created_at: '2024-05-17T13:02:22.788Z',
    //           updated_at: '2024-05-17T13:02:22.788Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/0/7/e/c/07eca16c7f0a778b35d1a6f17f4f388f.jpg',
    //           followed: false,
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     id: 428,
    //     title: 'Em Đây Chẳng Phải Thúy Kiều',
    //     lyric:
    //       'Em đây chẳng phải Thúy Kiều\n      Thúy Vân lại càng không phải\n      Nhưng vẫn hồn nhiên yêu đời\n      Như bao cô gái tuyệt vời',
    //     release_date: null,
    //     duration: null,
    //     views: 60000000,
    //     track_number: null,
    //     image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/0/2/2/3/02233cfbdea8c3cf01583b4d88123f41.jpg',
    //     audio:
    //       'https://res.cloudinary.com/dx9vr7on4/video/upload/v1715922017/music_kl/son%20tung/9214380421917830314_3_c2caxk.mp3',
    //     liked: false,
    //     singers: [
    //       {
    //         id: 124,
    //         name: 'Hoàng Thùy Linh',
    //         tag: 'singer',
    //         description:
    //           "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //         birthdate: '1988-08-11',
    //         created_at: '2024-05-17T13:02:22.759Z',
    //         updated_at: '2024-05-17T13:02:22.759Z',
    //         image:
    //           'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //       },
    //     ],
    //     owner: null,
    //     genre: {
    //       id: 25,
    //       title: 'Nhạc Trẻ',
    //       description:
    //         'Nhạc trẻ là thể loại âm nhạc phổ biến nhất ở Việt Nam, thường kết hợp giữa các yếu tố của pop, dance và ballad. Nó thường thể hiện những câu chuyện về tình yêu, cuộc sống hàng ngày và tâm trạng của giới trẻ.',
    //       image:
    //         'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/0/2/7/602715b10214ef6af7e9fadbb87a21c4.jpg',
    //       songs: null,
    //       singers: [
    //         {
    //           id: 123,
    //           name: 'Sơn Tùng M-TP',
    //           tag: 'singer',
    //           description:
    //             "Một trong những ca sĩ nổi tiếng nhất Việt Nam hiện nay, nổi tiếng với phong cách âm nhạc độc đáo và các bản hit như 'Em Của Ngày Hôm Qua', 'Lạc Trôi'.",
    //           birthdate: '1994-07-05',
    //           created_at: '2024-05-17T13:02:22.748Z',
    //           updated_at: '2024-05-17T13:02:22.748Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 124,
    //           name: 'Hoàng Thùy Linh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách biểu diễn mạnh mẽ và sáng tạo, nổi bật với các ca khúc như 'Để Mị Nói Cho Mà Nghe'.",
    //           birthdate: '1988-08-11',
    //           created_at: '2024-05-17T13:02:22.759Z',
    //           updated_at: '2024-05-17T13:02:22.759Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/e/a/bbea30c997bf82ee4f90882734fdf17a.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 125,
    //           name: 'Đen Vâu',
    //           tag: 'singer',
    //           description:
    //             "Rapper nổi tiếng với phong cách rap đời thường và các bài hát như 'Đưa Nhau Đi Trốn', 'Anh Đếch Cần Gì Nhiều Ngoài Em'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.765Z',
    //           updated_at: '2024-05-17T13:02:22.765Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/d/3/4/4d347aacb2be84d868dd6d25bb4aa503.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 126,
    //           name: 'Tóc Tiên',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ và diễn viên nổi tiếng với phong cách thời trang và âm nhạc hiện đại, các bài hát nổi bật gồm 'Ngày Mai', 'Big Girls Don't Cry'.",
    //           birthdate: '1989-05-13',
    //           created_at: '2024-05-17T13:02:22.773Z',
    //           updated_at: '2024-05-17T13:02:22.773Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/2/0/9/2209495c8a8ad13a01f13fb60a5769d1.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 127,
    //           name: 'Min',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi bật với các bài hit như 'Có Em Chờ', 'Ghen', mang phong cách âm nhạc trẻ trung và hiện đại.",
    //           birthdate: '1988-12-07',
    //           created_at: '2024-05-17T13:02:22.780Z',
    //           updated_at: '2024-05-17T13:02:22.780Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/2/e/f/6/2ef6b4fc14d359656cde9d5e09842b57.jpg',
    //           followed: false,
    //         },
    //         {
    //           id: 128,
    //           name: 'Noo Phước Thịnh',
    //           tag: 'singer',
    //           description:
    //             "Ca sĩ nổi tiếng với giọng hát trữ tình và các bản hit như 'Cause I Love You', 'Như Phút Ban Đầu'.",
    //           birthdate: '1988-12-18',
    //           created_at: '2024-05-17T13:02:22.788Z',
    //           updated_at: '2024-05-17T13:02:22.788Z',
    //           image:
    //             'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/0/7/e/c/07eca16c7f0a778b35d1a6f17f4f388f.jpg',
    //           followed: false,
    //         },
    //       ],
    //     },
    //   },
    // ]);
    setSongsInRoom(data)
  };
  console.log('songInRoom: ', songsInRoom);

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
      video.src =
        'https://vnso-pt-15-tf-a128-z3.zmdcdn.me/756ba39ea07eb46c326b54c999668a94?authen=exp=1716058741~acl=/756ba39ea07eb46c326b54c999668a94/*~hmac=8322462b2f81ebbaef181e2dcc9dbad2';
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
                    <Tooltip placement="top" title="Phát">
                      <IconButton disabled={ownerRoomId !== user_id} onClick={() => handleButtonClickSongs(song.audio)}>
                        <PlayCircleOutline />
                      </IconButton>
                    </Tooltip>
                  </StyleMoreButton>
                </SongTitle>
              </PlaylistItem>
            ))}
          </PlaylistContainer>
          <StyledAudio>
            <audio id="audioPlayer" autoPlay controls={true} src={url} ref={audioRef} />
          </StyledAudio>

          <Box mb={2} display={'flex'} flexDirection={'column'} maxHeight={'calc(100vh - 64px)'} overFlowY={'auto'}>
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
