import { Box, alpha, lighten, useTheme } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdvertiseBanner } from '../../components/AdvertiseBanner';
import CommentModal from '../../components/Comment/CommentModal';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MediaControlCard from '../../components/MediaControlCard';
import LyricModal from '../../components/MediaControlCard/Lyric';
import OTPInput from '../../components/OTP';
import Sidebar from '../../components/Sidebar';
import Snackbars from '../../components/Snackbar';
import { KContext } from '../../context';
import { FullScreenMediaControlCard } from '../../pages/Home/styles';

const DefaultLayout = ({ children }: any) => {
  const theme = useTheme();
  const { currentSong, error, success, isOpenAdvertise, setIsOpenAdvertise, currentUser } = useContext(KContext);
  const location = useLocation();
  const hideMediaControlCard = /^\/rooms(\/|$)/.test(location.pathname);
  useEffect(() => {
    if (currentUser?.premium) {
      setIsOpenAdvertise(false);
      return;
    } else {
      setIsOpenAdvertise(true);
    }

    const timer = setInterval(
      () => {
        setIsOpenAdvertise(true);
      },
      15 * 60 * 1000,
    );

    return () => clearTimeout(timer);
  }, [currentUser, setIsOpenAdvertise]);
  return (
    <div style={{ position: 'relative' }}>
      <Box
        sx={{
          flex: 1,
          height: '100%',
          position: 'relative',

          '.MuiPageTitle-wrapper': {
            background: theme.palette.mode === 'dark' ? theme.colors.alpha.trueWhite[5] : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15,
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(theme.colors.alpha.black[100], 0.1)}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05,
                  )}`,
          },
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
        >
          <Box display="block">{children || <Outlet />}</Box>
          <Footer />
        </Box>
      </Box>
      <OTPInput />
      {isOpenAdvertise && <AdvertiseBanner />}
      {!hideMediaControlCard && (
        <FullScreenMediaControlCard>
          <MediaControlCard />
          {currentSong && <CommentModal song={currentSong} />}
          {currentSong && <LyricModal song={currentSong} />}
        </FullScreenMediaControlCard>
      )}
      {error && <Snackbars status="error" open={true} message={error} />}
      {success && <Snackbars status="success" open={true} message={success} />}
    </div>
  );
};

export { DefaultLayout };
