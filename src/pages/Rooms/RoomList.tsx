
import { Delete } from '@mui/icons-material';
import { Button, IconButton, Paper, Typography } from '@mui/material';
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { KContext } from '../../context';
import { deleteMyRoom, createMyRoom } from '../../services/user';

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
  user_name: string
}

interface RoomListProps {
  rooms: Room[];
  isPrivate?: boolean;
  getAllRooms?: () => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, isPrivate, getAllRooms }) => {
  const { setError, setSuccess } = useContext(KContext);

  const handleDeleteRoom = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this room?");
    if (confirmed) {
      try {
        const data = await deleteMyRoom(id);
        console.log('data: ', data);
        setSuccess("Xóa phòng thành công");
        if (getAllRooms) {
          getAllRooms();
        }
      } catch (error) {
        setError("Có lỗi xảy ra khi xóa phòng");
        console.error('Error deleting room:', error);
      }
    }
  };

  return (
    <>
      {rooms &&
        rooms.map((room) => (
          <Paper key={room.id} sx={{ p: 2, mb: 2 }}>
            <Typography fontSize={16} fontWeight={600}>
              {room.name} { !isPrivate ? `(Phòng của ${room.user_name})` : ''}
            </Typography>
            <Typography fontSize={14}>{room.description}</Typography>
            <Link to={`/rooms/${room.uuid}`} className="link">
              <Button variant="contained" size="small" color="primary">
                Tham gia
              </Button>
            </Link>
            {isPrivate && (
              <IconButton onClick={() => handleDeleteRoom(room.uuid)}>
                <Delete color="error" />
              </IconButton>
            )}
          </Paper>
        ))}
    </>
  );
};

export default RoomList;
