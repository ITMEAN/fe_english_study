import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import getUser from '../../helper/User';
import { useNavigate } from 'react-router-dom';
import { BarChart } from '@mui/icons-material';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.reload();
  }
  const user = getUser();
  const isAdmin = user?.roles.includes("ROLE_ADMIN");
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  const firstLetter = user?.fullName.charAt(0).toUpperCase();
  const navigation = useNavigate();

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'flex-start',alignSelf:'flex-start', textAlign: 'center',width:'50px'}}>
        <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {user.avatar? <Avatar src={user.avatar} /> : <Avatar sx={{ bgcolor: "#"+randomColor }}>{firstLetter}</Avatar>}
        </IconButton>
      
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Trang cá nhân
        </MenuItem>
        <Divider />
        {isAdmin && (
            <MenuItem onClick={()=>navigation("/admin")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Quản Trị Viên
          </MenuItem>)}
        <MenuItem onClick={()=>navigation("/test/analysis")}>
        <ListItemIcon>
              <BarChart fontSize="small" />
            </ListItemIcon>
            Thống kê
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}