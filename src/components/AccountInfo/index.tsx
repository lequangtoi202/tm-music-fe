import { Avatar, Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Playlist from '../Playlist';
import ListItem from '../ListItem';

function AccountInfo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const data = {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    id: '3',
  };
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={data.src} alt={data.title} sx={{ width: 80, height: 80 }} />
          <Box ml={2}>
            <Typography variant="h6">{data.title}</Typography>
            <Typography variant="body1">Account ID: {data.id}</Typography>
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
