import { Avatar, Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Playlist from '../Playlist';
import ListItem from '../ListItem';
import { IUser } from '../../types/User';
import { getCurrentUser } from '../../utils/storage';
import images from '../../assets/images';

function AccountInfo() {
  const [user, setUser] = useState<IUser | null>(null);
  const [tabValue, setTabValue] = useState(0);
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={user?.avatar ?? images.noImage} alt={user?.firstName} sx={{ width: 80, height: 80 }} />
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
        </Tabs>
        {tabValue === 0 && <Playlist />}
        {tabValue === 1 && <ListItem />}
      </Paper>
    </Box>
  );
}

export default AccountInfo;
