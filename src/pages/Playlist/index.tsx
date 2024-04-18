import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Playlist from '../../components/Playlist';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
import { PlaylistModal } from '../../components/PlaylistModal';
const theme = createTheme();

function MyPlaylist() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ pb: 3 }}>
          <TextHeaderOnly text={'Gần Đây'} />
          <Playlist />
        </Box>

        <PlaylistModal />
      </ThemeProvider>
    </div>
  );
}

export default MyPlaylist;
