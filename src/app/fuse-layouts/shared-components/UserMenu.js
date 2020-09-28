import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import * as profileActions from 'app/main/profile/store/actions';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/profile/store/reducers';
import ProfileDialog from '../../main/profile';

function UserMenu(props) {
   const dispatch = useDispatch();
   const user = useSelector(({ auth }) => auth.user);

   const [userMenu, setUserMenu] = useState(null);

   const userMenuClick = event => {
      setUserMenu(event.currentTarget);
   };

   const userMenuClose = () => {
      setUserMenu(null);
   };

   return (
      <React.Fragment>

         <Button className="h-64" onClick={userMenuClick}>
            {user.data.photoURL ?
               (
                  <Avatar className="" alt="user photo" src={user.data.photoURL} />
               )
               :
               (
                  <Avatar className="">
                     {user.data.displayName[0]}
                  </Avatar>
               )
            }

            <div className="hidden md:flex flex-col ml-12 items-start">
               <Typography component="span" className="normal-case font-600 flex">
                  {user.data.displayName}
               </Typography>
            </div>

            <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
         </Button>

         <Popover
            open={Boolean(userMenu)}
            anchorEl={userMenu}
            onClose={userMenuClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center'
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'center'
            }}
            classes={{
               paper: "py-8"
            }}
         >
            <React.Fragment>
               <MenuItem
                  onClick={() => {
                     dispatch(profileActions.openProfileDialog());
                     userMenuClose();
                  }}
               >
                  <ListItemIcon className="min-w-40">
                     <Icon>account_circle</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="パスワード変更" />
               </MenuItem>
               <MenuItem
                  onClick={() => {
                     dispatch(authActions.logoutUser());
                     userMenuClose();
                     props.history.push('/login');
                  }}
               >
                  <ListItemIcon className="min-w-40">
                     <Icon>exit_to_app</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="ログアウト" />
               </MenuItem>
            </React.Fragment>
         </Popover>

         <ProfileDialog />
      </React.Fragment>
   );
}

export default withReducer('profileApp', reducer)(withRouter(UserMenu));

