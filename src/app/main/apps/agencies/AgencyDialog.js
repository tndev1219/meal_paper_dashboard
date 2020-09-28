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
import { useForm } from '@fuse/hooks';
import { FuseUtils } from '@fuse';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
   code: '',
   name: '',
   treasurer_name: '',
   contact: '',
   email: ''
};

function AgencyDialog(props) {
   const dispatch = useDispatch();
   const AgencyDialog = useSelector(({ agenciesApp }) => agenciesApp.agencies.agencyDialog);
   const { form, handleChange, setForm } = useForm(defaultFormState);

   const initDialog = useCallback(
      () => {
         if (AgencyDialog.type === 'edit' && AgencyDialog.data) {
            AgencyDialog.data.email = '';
            setForm({ ...AgencyDialog.data });
         }

         if (AgencyDialog.type === 'new') {
            setForm({
               ...defaultFormState,
               // ...AgencyDialog.data,
               id: FuseUtils.generateGUID()
            });
         }
      },
      [AgencyDialog.data, AgencyDialog.type, setForm]
   );

   useEffect(() => {
      /**
      * After Dialog Open
      */
      if (AgencyDialog.props.open) {
         initDialog();
      }

   }, [AgencyDialog.props.open, initDialog]);

   function closeComposeDialog() {
      AgencyDialog.type === 'edit' ? dispatch(Actions.closeEditAgencyDialog()) : dispatch(Actions.closeNewAgencyDialog());
   }

   function canBeSubmitted() {
      if (AgencyDialog.type === 'edit') {
         return (
            form.code.length > 0 && form.name.length > 0 && form.treasurer_name.length > 0 && form.contact.length > 0
         );
      } else {
         return (
            form.code.length > 0 && form.name.length > 0 && form.treasurer_name.length > 0 && form.contact.length > 0 && form.email.length > 0
         );
      }
   }

   function handleSubmit(event) {
      event.preventDefault();

      if (AgencyDialog.type === 'new') {
         dispatch(Actions.addAgency(form));
      } else {
         dispatch(Actions.updateAgency(form));
      }

      closeComposeDialog();
   }

   function handleRemove() {
      dispatch(Actions.removeAgency(form.id));
      closeComposeDialog();
   }

   return (
      <Dialog
         classes={{ paper: "m-24" }}
         {...AgencyDialog.props}
         onClose={() => {
            closeComposeDialog()
         }}
         fullWidth
         maxWidth="xs"
      >

         <AppBar position="static" elevation={1}>
            <Toolbar className="flex w-full">
               <Typography variant="subtitle1" color="inherit">
                  {AgencyDialog.type === 'new' ? '代理店追加' : '代理店編集'}
               </Typography>
            </Toolbar>
         </AppBar>
         <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
            <DialogContent classes={{ root: "pl-24 pt-24 pr-24" }}>

               <div className="flex">
                  <TextField
                     className="mb-24"
                     label="代理店コード"
                     autoFocus
                     id="code"
                     name="code"
                     value={form.code}
                     onChange={handleChange}
                     variant="outlined"
                     required
                     fullWidth
                  />
               </div>

               <div className="flex">
                  <TextField
                     className="mb-24"
                     label="代理店名"
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
               {AgencyDialog.type === 'new' &&
                  <>
                     <div className="flex">
                        <TextField
                           className="mb-24"
                           label="メールアドレス"
                           type="email"
                           id="email"
                           name="email"
                           value={form.email}
                           onChange={handleChange}
                           variant="outlined"
                           required
                           fullWidth
                        />
                     </div>

                     <div className="flex">
                        <div className="mb-24">パスワードは既定で「password」に設定されます。プロフィールページでパスワードを変更できます。</div>
                     </div>
                  </>
               }
            </DialogContent>

            {AgencyDialog.type === 'new' ? (
               <DialogActions className="justify-between pl-24 pb-24 pr-24">
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={handleSubmit}
                     type="submit"
                     disabled={!canBeSubmitted()}
                  >
                     追加
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
                        保管
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

export default AgencyDialog;
