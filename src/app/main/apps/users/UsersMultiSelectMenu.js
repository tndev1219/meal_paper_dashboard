import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function UsersMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedUserIds = useSelector(({usersApp}) => usersApp.users.selectedUserIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedUserMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedUserMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedUsersMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedUserMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedUsersMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedUserMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeUsers(selectedUserIds));
                     closeSelectedUserMenu();
                  }}
               >
                  <ListItemIcon className="min-w-40">
                     <Icon>delete</Icon>
                  </ListItemIcon>
                  <ListItemText primary="一括削除"/>
               </MenuItem>
            </MenuList>
         </Menu>
      </React.Fragment>
   );
}

export default UsersMultiSelectMenu;

