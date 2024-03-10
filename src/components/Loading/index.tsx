import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height="100vh">
      <CircularProgress size={48} />
    </Box>
  );
};

export default Loading;
