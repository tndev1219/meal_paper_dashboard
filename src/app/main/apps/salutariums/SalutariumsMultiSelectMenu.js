import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function SalutariumsMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedSalutariumIds = useSelector(({salutariumsApp}) => salutariumsApp.salutariums.selectedSalutariumIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedSalutariumMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedSalutariumMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedSalutariumsMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedSalutariumMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedSalutariumsMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedSalutariumMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeSalutariums(selectedSalutariumIds));
                     closeSelectedSalutariumMenu();
                  }}
               >
                  <ListItemIcon className="min-w-40">
                     <Icon>delete</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Remove"/>
               </MenuItem>
            </MenuList>
         </Menu>
      </React.Fragment>
   );
}

export default SalutariumsMultiSelectMenu;

