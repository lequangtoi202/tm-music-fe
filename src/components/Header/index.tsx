import { useContext, useState } from 'react';

import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import {
  Box,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  lighten,
  styled,
  useTheme,
} from '@mui/material';

import { heightHeader, sidebarWidth } from '../../constants';
import { SidebarContext } from '../../context/SidebarContext';
import HeaderButtons from './Buttons';
import { DialogWrapper } from './Buttons/Search/styles';
import HeaderUserbox from './Userbox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${heightHeader};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background || '', 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${sidebarWidth}px;
            width: auto;
        }
`,
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15,
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(theme.colors.alpha.black[100], 0.2)}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1,
              )}`,
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      ></Stack>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        {openSearchResults && (
          <DialogWrapper open={open} keepMounted maxWidth="sm" fullWidth scroll="paper" onClose={handleClose}>
            <DialogContent>
              <Box sx={{ pt: 0, pb: 1 }} display="flex" justifyContent="space-between">
                <Typography variant="body2" component="span">
                  Search results for{' '}
                  <Typography sx={{ fontWeight: 'bold' }} variant="body1" component="span">
                    a
                  </Typography>
                </Typography>
              </Box>
            </DialogContent>
          </DialogWrapper>
        )}
        <HeaderUserbox />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' },
          }}
        >
          <Tooltip arrow title="Xem thêm">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon fontSize="small" /> : <CloseTwoToneIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
