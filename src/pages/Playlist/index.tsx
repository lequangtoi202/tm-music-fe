import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Playlist from '../../components/Playlist';
import { TextHeaderOnly } from '../../components/TextHeaderOnly';
const theme = createTheme();

function MyPlaylist() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <TextHeaderOnly text={'Gần Đây'} />
          <Playlist />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default MyPlaylist;
