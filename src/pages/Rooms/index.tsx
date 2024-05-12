import { useContext, useEffect, useState } from 'react';

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import RoomList from "./RoomList";
import { KContext } from '../../context';
import { createCheckoutSubmission, getRooms } from '../../services/user';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    newRoomButton: {
      marginTop: theme.spacing(2),
    },
  })
);

function Rooms() {
  const { currentUser } = useContext(KContext);
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomsPrivate, setRoomsPrivate] = useState<any[]>([]);

  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const resRooms = await getRooms();
      setRooms(resRooms.data.public_rooms)
      setRoomsPrivate(resRooms.data.private_rooms)
    })();
  }, []);

  const handleBuyPremium = async () => {
    try {
      const res = await createCheckoutSubmission();
      window.location.href = res.url;
    } catch (error) {
      alert('Failed to process premium purchase. Please try again later.');
    }
  }
  
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.title}>
            System Rooms
          </Typography>
        </Grid>
      </Grid>
      <RoomList rooms={rooms} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.title}>
            My Rooms
          </Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          {currentUser?.premium ?
            <Button
              variant="contained"
              color="secondary"
              className={classes.newRoomButton}
            >
              New Room
            </Button>
          : 
            <Button
              variant="contained"
              color="secondary"
              className={classes.newRoomButton}
              onClick={handleBuyPremium}
            >
              Buy Premium
            </Button>
          }
        </Grid>
      </Grid>
      <RoomList rooms={roomsPrivate} />
    </Container>
  );
}

export default Rooms;
