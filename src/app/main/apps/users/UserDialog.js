import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from '@fuse/hooks';
import { FuseUtils, FuseAnimate } from '@fuse';
import moment from 'moment';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
   KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import settingConfig from '../../../fuse-configs/settingsConfig';
import { showMessage } from 'app/store/actions';
import { orange } from '@material-ui/core/colors';
import clsx from 'clsx';
import _ from '@lodash';

const defaultFormState = {
   salutarium: null,
   name: '',
   email: '',
   age: '',
   unit_layer: '',
   weight: '',
   height: '',
   disease: '',
   contact: '',
   money: '',
   patients: [],
};

const useStyles = makeStyles(theme => ({
   productImageFeaturedStar: {
      position: 'absolute',
      top: 0,
      right: 0,
      color: orange[400],
      opacity: 0
   },
   productImageUpload: {
      transitionProperty: 'box-shadow',
      transitionDuration: theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
   },
   productImageItem: {
      transitionProperty: 'box-shadow',
      transitionDuration: theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      '&:hover': {
         '& $productImageFeaturedStar': {
            opacity: .8
         }
      },
      '&.featured': {
         pointerEvents: 'none',
         boxShadow: theme.shadows[3],
         '& $productImageFeaturedStar': {
            opacity: 1
         },
         '&:hover $productImageFeaturedStar': {
            opacity: 1
         }
      }
   }
}));

function UserDialog(props) {
   const dispatch = useDispatch();
   const userDialog = useSelector(({ usersApp }) => usersApp.users.userDialog);
   const salutariums = useSelector(({ usersApp }) => usersApp.users.salutariums);
   const { form, handleChange, setForm } = useForm(defaultFormState);
   const [csvUploading, setImageUploading] = React.useState(false);
   const classes = useStyles(props);

   const initDialog = useCallback(
      () => {
         if (userDialog.type === 'edit' && userDialog.data) {
            setForm({ ...userDialog.data });
         }

         if (userDialog.type === 'new') {
            setForm({
               ...defaultFormState,
               ...userDialog.data,
               id: FuseUtils.generateGUID()
            });
         }
      },
      [userDialog.data, userDialog.type, setForm]
   );

   useEffect(() => {
      /**
      * After Dialog Open
      */
      if (userDialog.props.open) {
         initDialog();
      }

   }, [userDialog.props.open, initDialog]);

   const [birthday, setSelectedDate] = React.useState(new Date());
   const [gender, selectGender] = React.useState(true);
   const [check, selectFile] = React.useState(false);

   function closeComposeDialog() {
      dispatch(Actions.closeNewUserDialog());
   }

   function canBeSubmitted() {
      if (check) {
         return (
            form.patients.length > 0 && form.salutarium
         )
      } else {
         return (
            form.salutarium && form.name.length > 0 && form.email.length > 0 && form.age.length > 0 &&
            form.unit_layer.length > 0 && form.weight.length > 0 && form.height.length > 0 && form.disease.length > 0 &&
            form.contact.length > 0 && form.money.length > 0
         );
      }
   }

   function handleSubmit(event) {
      event.preventDefault();
      if (check) {
         let patients = form.patients.map(patient => {
            patient.age = parseInt(patient.age)
            patient.weight = parseFloat(patient.weight)
            patient.height = parseFloat(patient.height)
            patient.money = parseFloat(patient.money)
            patient.salutarium = form.salutarium;
            patient.password = 'password';
            patient.role = 1;

            return patient
         })

         for (let i = 0; i < patients.length; i++) {
            dispatch(Actions.addUser(patients[i]))
         }
      } else {
         let data = form;
         data.birthday = moment(birthday).format('YYYY-MM-DD');
         data.gender = gender;
         data.role = 1;
         data.password = 'password';

         dispatch(Actions.addUser(form));
      }

      closeComposeDialog();
   }

   function handleUploadChange(e) {
      const file = e.target.files[0];

      if (!file) {
         return;
      }

      const formData = new FormData();
      formData.append('file', file);

      var url = '';
      url = `${settingConfig.apiServerURL}/api/update-profile/csvUpload/`;
      setImageUploading(true);

      axios.post(url, formData)
         .then(response => {
            if (!response.data.success) {
               dispatch(showMessage({
                  message: '失敗しました。',
                  autoHideDuration: 2000,
                  anchorOrigin: {
                     vertical: 'top',
                     horizontal: 'right'
                  },
                  variant: 'warning'
               }));
            } else {
               setForm(_.set({ ...form }, 'patients', response.data.result));
            }

            setImageUploading(false);
         })
         .catch(err => {
            dispatch(showMessage({
               message: '失敗しました。',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'error'
            }));

            setImageUploading(false);
         });
   }

   return (
      <Dialog
         classes={{ paper: "m-24" }}
         {...userDialog.props}
         onClose={() => {
            closeComposeDialog()
         }}
         fullWidth
         maxWidth="xs"
      >

         <AppBar position="static" elevation={1}>
            <Toolbar className="flex w-full">
               <Typography variant="subtitle1" color="inherit">
                  入居者追加
               </Typography>
            </Toolbar>
         </AppBar>
         <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
            <DialogContent classes={{ root: "pl-24 pt-24 pr-24" }}>

               <div className="flex">
                  <FormControl variant="outlined" style={{ width: '100%' }}>
                     <InputLabel>
                        療養所選択 *
                     </InputLabel>
                     <Select
                        name="salutarium"
                        value={form.salutarium}
                        onChange={handleChange}
                        labelWidth={90}
                        className="mb-24"
                     >
                        {salutariums.map((data, key) => (
                           <MenuItem key={key} value={data.id}>{data.name}</MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </div>

               {!check &&
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

                     <div className="flex">
                        <TextField
                           className="mb-24 pr-8"
                           label="氏名 (ふりがな)"
                           id="name"
                           name="name"
                           value={form.name}
                           onChange={handleChange}
                           variant="outlined"
                           required
                           fullWidth
                        />
                        <TextField
                           className="mb-24 pl-8"
                           label="年齢"
                           id="age"
                           name="age"
                           value={form.age}
                           onChange={handleChange}
                           variant="outlined"
                           type="number"
                           required
                           fullWidth
                        />
                     </div>

                     <div className="flex">
                        <KeyboardDatePicker
                           format="YYYY年 MM月 DD日"
                           id="birthday"
                           label="生年月日"
                           value={birthday}
                           onChange={date => setSelectedDate(date)}
                           className="mb-24"
                           style={{ width: '100%' }}
                        />
                     </div>

                     <div className="flex">
                        <FormControl component="fieldset" className="mb-8">
                           <FormLabel component="legend">性別</FormLabel>
                           <RadioGroup aria-label="gender" name="gender" value={gender} onChange={() => selectGender(!gender)} style={{ flexDirection: 'row' }}>
                              <FormControlLabel value={true} control={<Radio />} label="男" />
                              <FormControlLabel value={false} control={<Radio />} label="女" />
                           </RadioGroup>
                        </FormControl>
                     </div>

                     <div className="flex">
                        <TextField
                           className="mb-24 pr-8"
                           label="体重 (kg)"
                           id="weight"
                           name="weight"
                           value={form.weight}
                           onChange={handleChange}
                           variant="outlined"
                           type="number"
                           required
                           fullWidth
                        />
                        <TextField
                           className="mb-24 pl-8"
                           label="身長 (cm)"
                           id="height"
                           name="height"
                           value={form.height}
                           onChange={handleChange}
                           variant="outlined"
                           type="number"
                           required
                           fullWidth
                        />
                     </div>

                     <div className="flex">
                        <TextField
                           className="mb-24"
                           label="ユニット名"
                           id="unit_layer"
                           name="unit_layer"
                           value={form.unit_layer}
                           onChange={handleChange}
                           variant="outlined"
                           required
                           fullWidth
                        />
                     </div>

                     <div className="flex">
                        <TextField
                           className="mb-24"
                           label="病名"
                           id="disease"
                           name="disease"
                           value={form.disease}
                           onChange={handleChange}
                           variant="outlined"
                           required
                           fullWidth
                        />
                     </div>

                     <div className="flex">
                        <TextField
                           className="mb-24 pr-8"
                           label="連絡先"
                           id="contact"
                           name="contact"
                           value={form.contact}
                           onChange={handleChange}
                           variant="outlined"
                           required
                           fullWidth
                        />
                        <TextField
                           className="mb-24 pl-8"
                           label="利用金額"
                           id="money"
                           name="money"
                           value={form.money}
                           onChange={handleChange}
                           variant="outlined"
                           type="number"
                           required
                           fullWidth
                        />
                     </div>
                  </>
               }

               <div className="flex" style={{ justifyContent: 'center' }}>
                  <FormControlLabel
                     control={<Checkbox checked={check} onChange={() => selectFile(!check)} name="file-upload" />}
                     label="CSVファイルアップロード"
                  />
               </div>

               {check &&
                  <div className="flex justify-center">
                     <input
                        accept=".csv"
                        className="hidden"
                        id="csv-file"
                        type="file"
                        onChange={(e) => handleUploadChange(e)}
                     />
                     <div className="flex justify-center sm:justify-start flex-wrap mb-24">
                        <label
                           htmlFor="csv-file"
                           className={
                              clsx(
                                 classes.productImageUpload,
                                 "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                              )}
                        >
                           <Grid container>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex justify-center">
                                 {!csvUploading && <Icon fontSize="large" color="action">cloud_upload</Icon>}
                                 {csvUploading && <CircularProgress size={24} />}
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex justify-center text-center">
                                 <p>CSV</p>
                              </Grid>
                           </Grid>
                        </label>
                        {form.patients.length !== 0 &&
                           <FuseAnimate animation="transition.slideRightIn" delay={300}>
                              <div
                                 className={
                                    clsx(
                                       classes.productImageItem,
                                       "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                                    )
                                 }
                              >
                                 CSV
                           </div>
                           </FuseAnimate>
                        }
                     </div>
                  </div>
               }

            </DialogContent>

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

         </form>
      </Dialog>
   );
}

export default UserDialog;
