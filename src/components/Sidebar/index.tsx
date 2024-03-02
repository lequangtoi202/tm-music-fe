import { useContext } from 'react';

import { Box, Drawer, alpha, styled, Divider, useTheme, Button, lighten, darken, Tooltip } from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Scrollbar from '../Scrollbar';
import { SidebarContext } from '../../context/SidebarContext';
import Logo from '../Logo';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`,
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();
  const menuList = [
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/admin/library' },
  ];
  const menuList1 = [{ label: 'Tạo playlist mới', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' }];
  const menuList2 = [
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/admin/library' },
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/admin/library' },
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/admin/library' },
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/admin/library' },
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/admin/library' },
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/admin/discover' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/admin/library' },
  ];
  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block',
          },
          position: 'fixed',
          left: 0,
          top: 0,
          width: 100,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background || '', 0.1), 0.5)
              : darken(theme.colors.alpha.black[100] || '', 0.5),
          boxShadow: theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box mt={3}>
          <Box
            mx={2}
            sx={{
              width: 52,
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[50],
            }}
          />
          <SidebarMenu menus={menuList} />
        </Box>
        <Divider
          sx={{
            mx: theme.spacing(2),
            background: theme.colors.alpha.trueWhite[50],
          }}
        />
        <Scrollbar>
          <SidebarMenu menus={menuList2} />
        </Scrollbar>
        <Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[50],
            }}
          />
          <SidebarMenu menus={menuList1} />
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52,
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <Scrollbar>
            <SidebarMenu menus={menuList} />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
