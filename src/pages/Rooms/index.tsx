import { useEffect, useState } from 'react';

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import RoomList from "./RoomList";
import { getRooms } from '../../services/user';


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
  const [rooms, setRooms] = useState<any[]>([]);

  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const resRooms = await getRooms();
      setRooms(resRooms.data)
    })();
  }, []);

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
          <Button
            variant="contained"
            color="secondary"
            className={classes.newRoomButton}
          >
            New Room
          </Button>
        </Grid>
      </Grid>
      <RoomList rooms={[]} />
    </Container>
  );
}

export default Rooms;
