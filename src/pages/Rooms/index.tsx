import { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import { KContext } from '../../context';
import { createCheckoutSubmission, getRooms } from '../../services/user';
import RoomList from './RoomList';
import Text from '../../components/Text';
import { RoomModal } from './CreateRoomModal';
const theme = createTheme();

function Rooms() {
  const { currentUser, setIsOpenAddRoomModal } = useContext(KContext);
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomsPrivate, setRoomsPrivate] = useState<any[]>([]);

  useEffect(() => {
    getAllRooms()
  }, []);

  const getAllRooms = async () => {
    const resRooms = await getRooms();
    setRooms(resRooms.data.public_rooms);
    setRoomsPrivate(resRooms.data.private_rooms);
  }

  const handleBuyPremium = async () => {
    try {
      const res = await createCheckoutSubmission();
      window.location.href = res.url;
    } catch (error) {
      alert('Failed to process premium purchase. Please try again later.');
    }
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Grid container mt={2} spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Text color="black" style={{ fontWeight: 'bold', fontSize: '22px' }}>
                {'Phòng của tôi'}
              </Text>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              {currentUser?.premium ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsOpenAddRoomModal(true);
                  }}
                >
                  Tạo phòng
                </Button>
              ) : (
                <Button variant="contained" onClick={handleBuyPremium}>
                  Mua Premium
                </Button>
              )}
            </Grid>
          </Grid>
          <RoomList rooms={roomsPrivate} isPrivate={true} getAllRooms={getAllRooms} />
          <Grid container spacing={2} mt={2} alignItems="center">
            <Grid item xs={6}>
              <Text color="black" style={{ fontWeight: 'bold', fontSize: '22px' }}>
                {'Cộng đồng'}
              </Text>
            </Grid>
          </Grid>
          <RoomList rooms={rooms} />
        </Container>
        <RoomModal getAllRooms={getAllRooms} />
      </ThemeProvider>
    </Box>
  );
}

export default Rooms;
