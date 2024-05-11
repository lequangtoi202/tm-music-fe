import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button } from "@material-ui/core";
import { Link, NavLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  roomCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

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
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const classes = useStyles();

  const handleJoinRoomClick = (roomId: number) => {
    console.log(`Joining room with id ${roomId}`);
  };

  return (
    <>
      {rooms && rooms.map((room) => (
        <Paper key={room.id} className={classes.roomCard}>
          <Typography variant="h6">{room.name}</Typography>
          <Typography variant="body1">{room.description}</Typography>
          <Link to={`/rooms/${room.uuid}`} className="link">
            <Button variant="contained" color="primary">
              Join Room
            </Button>
          </Link>
        </Paper>
      ))}
    </>
  );
};

export default RoomList;
