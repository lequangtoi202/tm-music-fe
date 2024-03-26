import { useContext, useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(true);

  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();
  const SkeletonMenuItem = (
    <Skeleton variant="rounded" height={40} animation="wave" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
  );
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderSkeletonContent = (length: number) => {
    return (
      <>
        {Array.from({ length: length }).map((_, index) => (
          <Box key={index} mt={2} mx={2}>
            {SkeletonMenuItem}
          </Box>
        ))}
      </>
    );
  };
  const menuList = [{ label: 'Khám Phá', icon: <DesignServicesTwoToneIcon />, to: '/' }];
  const menuList1 = [{ label: 'Tạo playlist mới', icon: <DesignServicesTwoToneIcon />, to: '/mymusic/playlist' }];
  const menuList2 = [
    { label: 'Chủ Đề & Thể Loại', icon: <DesignServicesTwoToneIcon />, to: '/chu-de' },
    { label: 'Album', icon: <DesignServicesTwoToneIcon />, to: '/albums' },
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
            {loading ? renderSkeletonContent(menuList.length) : <SidebarMenu menus={menuList} />}
          </Box>
          <Box>
            <Divider
              sx={{
                mx: theme.spacing(4),
                background: theme.colors.alpha.trueWhite[50],
              }}
            />
            <Scrollbar>
              {loading ? renderSkeletonContent(menuList2.length) : <SidebarMenu menus={menuList2} />}
            </Scrollbar>
          </Box>
          <Box>
            <Divider
              sx={{
                mt: theme.spacing(1),
                mx: theme.spacing(4),
                background: theme.colors.alpha.trueWhite[50],
              }}
            />
            {loading ? renderSkeletonContent(menuList1.length) : <SidebarMenu menus={menuList1} />}
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
              {loading ? renderSkeletonContent(menuList.length) : <SidebarMenu menus={menuList} />}
            </Box>
            <Divider
              sx={{
                mx: theme.spacing(4),
                background: theme.colors.alpha.trueWhite[50],
              }}
            />
            <Scrollbar>
              {loading ? renderSkeletonContent(menuList2.length) : <SidebarMenu menus={menuList2} />}
            </Scrollbar>
            <Box>
              <Divider
                sx={{
                  mt: theme.spacing(3),
                  mx: theme.spacing(4),
                  background: theme.colors.alpha.trueWhite[50],
                }}
              />
              {loading ? renderSkeletonContent(menuList1.length) : <SidebarMenu menus={menuList1} />}
            </Box>
          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
