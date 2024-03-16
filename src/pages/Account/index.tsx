import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountInfo from '../../components/AccountInfo';
import { CssBaseline } from '@mui/material';
const theme = createTheme();
function Account() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AccountInfo />
      </ThemeProvider>
    </div>
  );
}

export default Account;
