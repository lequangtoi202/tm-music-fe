import { Alert, AlertColor, Box, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { KContext } from '../../context';
function Snackbars({ status, message, open }: { status: AlertColor | undefined; message: string; open: boolean }) {
  const { setError, setSuccess } = useContext(KContext);
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => {
          setError(null);
          setSuccess(null);
        }}
        open={open}
        autoHideDuration={2500}
      >
        <Alert severity={status} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default Snackbars;
