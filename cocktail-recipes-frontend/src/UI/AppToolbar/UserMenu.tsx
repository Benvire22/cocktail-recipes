import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../types';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import { API_URL } from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await dispatch(logout());
    handleClose();
  };

  return (
    <Grid>
      <Button onClick={handleClose} color="inherit" component={NavLink} to="/cocktails/new">
        new cocktail
      </Button>
      <Button color="inherit" sx={{ ml: 10, textTransform: 'none' }} onClick={handleClick}>
        {user.displayName}
        <Avatar sx={{ ml: 2 }} src={`${API_URL}/${user.avatar}`} alt={user.displayName} />
      </Button>
      <Menu open={isOpen} onClose={handleClose} anchorEl={anchorEl} keepMounted>
        <MenuItem onClick={handleClose} component={NavLink} to={`/user-cocktails/${user._id}`}>
          Show my cocktails
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
