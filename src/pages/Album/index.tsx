import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AlbumDetail from '../../components/AlbumDetail';
const theme = createTheme();

function Album() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlbumDetail />
      </ThemeProvider>
    </div>
  );
}

export default Album;
