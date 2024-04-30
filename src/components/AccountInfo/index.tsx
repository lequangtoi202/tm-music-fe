import { Avatar, Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Playlist from '../Playlist';
import ListItem from '../ListItem';
import { IUser } from '../../types/User';
import { getCurrentUser } from '../../utils/storage';

function AccountInfo() {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={user?.avatar ?? '../../assets/images/no-image.png'}
            alt={user?.firstName}
            sx={{ width: 80, height: 80 }}
          />
          <Box ml={2}>
            <Typography variant="h6">{user?.firstName}</Typography>
            <Typography variant="body1">Account ID: {user?.id}</Typography>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, margin: 2, minHeight: '600px' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Account Tabs">
          <Tab label="Playlist" />
          <Tab label="Tải lên" />
          <Tab label="Bạn bè" />
        </Tabs>
        {tabValue === 0 && <Playlist />}
        {tabValue === 1 && <ListItem />}
        {tabValue === 2 && <ListItem />}
      </Paper>
    </Box>
  );
}

export default AccountInfo;
