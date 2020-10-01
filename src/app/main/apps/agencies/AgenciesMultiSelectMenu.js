import React, { useState } from 'react';
import { Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@material-ui/core';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

function AgenciesMultiSelectMenu(props) {
   const dispatch = useDispatch();
   const selectedAgencyIds = useSelector(({ agenciesApp }) => agenciesApp.agencies.selectedAgencyIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedAgencyMenu(event) {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedAgenciesMenu() {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedAgenciesMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedAgencyMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedAgenciesMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedAgenciesMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeAgencys(selectedAgencyIds));
                     closeSelectedAgenciesMenu();
                  }}
               >
                  <ListItemIcon className="min-w-40">
                     <Icon>delete</Icon>
                  </ListItemIcon>
                  <ListItemText primary="一括削除" />
               </MenuItem>
            </MenuList>
         </Menu>
      </React.Fragment>
   );
}

export default AgenciesMultiSelectMenu;

