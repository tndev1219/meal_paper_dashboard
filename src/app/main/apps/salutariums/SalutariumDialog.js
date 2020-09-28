import React, { useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from '@fuse/hooks';
import { FuseUtils } from '@fuse';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
   agency: null,
   name: '',
   treasurer_name: '',
   contact: ''
};

function SalutariumDialog(props) {
   const dispatch = useDispatch();
   const salutariumDialog = useSelector(({ salutariumsApp }) => salutariumsApp.salutariums.salutariumDialog);
   const agencies = useSelector(({ salutariumsApp }) => salutariumsApp.salutariums.agencies);
   const { form, handleChange, setForm } = useForm(defaultFormState);

   const initDialog = useCallback(
      () => {
         if (salutariumDialog.type === 'edit' && salutariumDialog.data) {
            setForm({ ...salutariumDialog.data });
         }

         if (salutariumDialog.type === 'new') {
            setForm({
               ...defaultFormState,
               ...salutariumDialog.data,
               id: FuseUtils.generateGUID()
            });
         }
      },
      [salutariumDialog.data, salutariumDialog.type, setForm]
   );

   useEffect(() => {
      /**
      * After Dialog Open
      */
      if (salutariumDialog.props.open) {
         initDialog();
      }

   }, [salutariumDialog.props.open, initDialog]);

   function closeComposeDialog() {
      salutariumDialog.type === 'edit' ? dispatch(Actions.closeEditSalutariumDialog()) : dispatch(Actions.closeNewSalutariumDialog());
   }

   function canBeSubmitted() {
      return (
         form.name.length > 0 && form.treasurer_name.length > 0 && form.contact.length > 0 && form.agency
      );
   }

   function handleSubmit(event) {
      event.preventDefault();

      if (salutariumDialog.type === 'new') {
         dispatch(Actions.addSalutarium(form));
      } else {
         dispatch(Actions.updateSalutarium(form));
      }

      closeComposeDialog();
   }

   function handleRemove() {
      dispatch(Actions.removeSalutarium(form._id));
      closeComposeDialog();
   }

   return (
      <Dialog
         classes={{ paper: "m-24" }}
         {...salutariumDialog.props}
         onClose={() => {
            closeComposeDialog()
         }}
         fullWidth
         maxWidth="xs"
      >

         <AppBar position="static" elevation={1}>
            <Toolbar className="flex w-full">
               <Typography variant="subtitle1" color="inherit">
                  {salutariumDialog.type === 'new' ? '療養所追加' : '療養所編集'}
               </Typography>
            </Toolbar>
         </AppBar>
         <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
            <DialogContent classes={{ root: "pl-24 pt-24 pr-24" }}>

               <div className="flex">
                  <FormControl variant="outlined" style={{ width: '100%' }}>
                     <InputLabel>
                        代理店選択 *
                     </InputLabel>
                     <Select
                        name="agency"
                        value={form.agency}
                        onChange={handleChange}
                        labelWidth={90}
                        className="mb-24"
                     >
                        {agencies.map((data, key) => (
                           <MenuItem key={key} value={data.id}>{data.name}</MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </div>

               <div className="flex">
                  <TextField
                     className="mb-24"
                     label="施設"
                     id="name"
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     variant="outlined"
                     required
                     fullWidth
                  />
               </div>

               <div className="flex">
                  <TextField
                     className="mb-24"
                     label="担当者"
                     id="treasurer_name"
                     name="treasurer_name"
                     value={form.treasurer_name}
                     onChange={handleChange}
                     variant="outlined"
                     required
                     fullWidth
                  />
               </div>

               <div className="flex">
                  <TextField
                     className="mb-24"
                     label="連絡先"
                     id="contact"
                     name="contact"
                     value={form.contact}
                     onChange={handleChange}
                     variant="outlined"
                     required
                     fullWidth
                  />
               </div>
            </DialogContent>

            {salutariumDialog.type === 'new' ? (
               <DialogActions className="justify-between pl-24 pb-24 pr-24">
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={handleSubmit}
                     type="submit"
                     disabled={!canBeSubmitted()}
                  >
                     Add
                  </Button>
               </DialogActions>
            ) : (
                  <DialogActions className="justify-between pl-24 pb-24 pr-24">
                     <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!canBeSubmitted()}
                     >
                        Save
                  </Button>
                     <IconButton
                        onClick={handleRemove}
                     >
                        <Icon>delete</Icon>
                     </IconButton>
                  </DialogActions>
               )}
         </form>
      </Dialog>
   );
}

export default SalutariumDialog;
