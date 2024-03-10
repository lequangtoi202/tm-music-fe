import { useContext } from 'react';

import { Box, Divider, Drawer, Skeleton, alpha, darken, lighten, styled, useTheme } from '@mui/material';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import { sidebarWidth } from '../../constants';
import { SidebarContext } from '../../context/SidebarContext';
import Logo from '../Logo';
import Scrollbar from '../Scrollbar';
import SidebarMenu from './SidebarMenu';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${sidebarWidth}px;
        min-width: ${sidebarWidth}px;
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
  const SkeletonMenuItem = (
    <Skeleton variant="rounded" height={40} animation="wave" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
  );

  const renderSkeletonContent = () => {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} mt={2} mx={2}>
            {SkeletonMenuItem}
          </Box>
        ))}
      </>
    );
  };
  const menuList = [
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/chu-de' },
  ];
  const menuList1 = [{ label: 'Tạo playlist mới', icon: <DesignServicesTwoToneIcon />, to: '/' }];
  const menuList2 = [
    { label: 'Khám phá', icon: <DesignServicesTwoToneIcon />, to: '/chu-de' },
    { label: 'Thư viện', icon: <DesignServicesTwoToneIcon />, to: '/albums' },
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
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(4),
                background: theme.colors.alpha.trueWhite[50],
              }}
            />
            {sidebarToggle ? renderSkeletonContent() : <SidebarMenu menus={menuList} />}
          </Box>
          <Box>
            <Divider
              sx={{
                mx: theme.spacing(4),
                background: theme.colors.alpha.trueWhite[50],
              }}
            />
            <Scrollbar>{sidebarToggle ? renderSkeletonContent() : <SidebarMenu menus={menuList2} />}</Scrollbar>
          </Box>
          <Box>
            <Divider
              sx={{
                mt: theme.spacing(1),
                mx: theme.spacing(4),
                background: theme.colors.alpha.trueWhite[50],
              }}
            />
            {sidebarToggle ? renderSkeletonContent() : <SidebarMenu menus={menuList1} />}
          </Box>
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

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Divider
                sx={{
                  mt: theme.spacing(3),
                  mx: theme.spacing(4),
                  background: theme.colors.alpha.trueWhite[50],
                }}
              />
              {sidebarToggle ? renderSkeletonContent() : <SidebarMenu menus={menuList} />}
            </Box>
            <Divider
              sx={{
                mx: theme.spacing(4),
                background: theme.colors.alpha.trueWhite[50],
              }}
            />
            <Scrollbar>{sidebarToggle ? renderSkeletonContent() : <SidebarMenu menus={menuList2} />}</Scrollbar>
            <Box>
              <Divider
                sx={{
                  mt: theme.spacing(3),
                  mx: theme.spacing(4),
                  background: theme.colors.alpha.trueWhite[50],
                }}
              />
              {sidebarToggle ? renderSkeletonContent() : <SidebarMenu menus={menuList1} />}
            </Box>
          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
