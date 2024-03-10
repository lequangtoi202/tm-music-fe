import { useContext, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { Avatar, Box, Button, Divider, Hidden, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { styled } from '@mui/material/styles';
import { KContext } from '../../../context';
import { StyledIcon } from './styles';
import { ActionItem } from './types';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`,
);

function HeaderUserbox() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Project Manager',
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { isLoggedIn } = useContext(KContext);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const listActions: ActionItem[] = isLoggedIn
    ? [
        { title: 'Hồ sơ', to: '/tai-khoan', icon: <AccountCircleIcon /> },
        { title: 'Đăng xuất', to: '/dang-xuat', icon: <LockIcon /> },
      ]
    : [
        { title: 'Đăng nhập', to: '/dang-nhap', icon: <LockIcon /> },
        { title: 'Đăng ký', to: '/dang-ky', icon: <VpnKeyIcon /> },
      ];

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="circular" alt={'Avatar user'} src={''} />
        {isLoggedIn && (
          <>
            <Hidden mdDown>
              <UserBoxText>
                <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
              </UserBoxText>
            </Hidden>
            <Hidden smDown>
              <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
            </Hidden>
          </>
        )}
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex" alignItems={'center'} justifyContent={'center'}>
          <Avatar variant="circular" alt={'Avatar user'} src={''} />
          {isLoggedIn && (
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            </UserBoxText>
          )}
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          {listActions.map((action, index) => (
            <ListItem key={index} to={action.to} component={NavLink}>
              <StyledIcon>{action.icon}</StyledIcon>
              <ListItemText primary={action.title} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
