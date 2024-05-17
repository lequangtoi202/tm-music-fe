import { Delete } from '@mui/icons-material';
import { Button, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Room {
  id: number;
  name: string;
  description: string;
  view: any;
  url: any;
  total_time: any;
  user_id: any;
  uuid: string;
  created_at: string;
  updated_at: string;
}

interface RoomListProps {
  rooms: Room[];
  isPrivate?: boolean;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, isPrivate }) => {
  const handleJoinRoomClick = (roomId: number) => {
    console.log(`Joining room with id ${roomId}`);
  };

  return (
    <>
      {rooms &&
        rooms.map((room) => (
          <Paper key={room.id} sx={{ p: 2, mb: 2 }}>
            <Typography fontSize={16} fontWeight={600}>
              {room.name}
            </Typography>
            <Typography fontSize={14}>{room.description}</Typography>
            <Link to={`/rooms/${room.uuid}`} className="link">
              <Button variant="contained" size="small" color="primary">
                Tham gia
              </Button>
            </Link>
            {isPrivate && (
              <IconButton onClick={() => {}}>
                <Delete color="error" />
              </IconButton>
            )}
          </Paper>
        ))}
    </>
  );
};

export default RoomList;
