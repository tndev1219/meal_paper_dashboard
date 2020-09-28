import axios from 'axios';
import { showMessage } from 'app/store/actions';
import settingConfig from '../../../../fuse-configs/settingsConfig';
import authService from '../../../../services/authService';

export const OPEN_PROFILE_DIALOG = '[PROFILE] OPEN PROFILE DIALOG';
export const CLOSE_PROFILE_DIALOG = '[PROFILE] CLOSE PROFILE DIALOG';

export function openProfileDialog() {
   return {
      type: OPEN_PROFILE_DIALOG
   };
}

export function closeProfileDialog() {
   return {
      type: CLOSE_PROFILE_DIALOG
   };
}

export function updatePassword(data) {
   return (dispatch) => {

      const profile = authService.getProfile();
      const sendData = {
         username: profile.email,
         password: data.current_password,
         new_password: data.password
      }

      const request = axios.post(`${settingConfig.apiServerURL}/api/auth-users/change-password/`, sendData);

      return request.then((response) => {
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
            dispatch(showMessage({
               message: '成功しました。',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
         }
      }).catch(err => {
         dispatch(showMessage({
            message: '失敗しました。',
            autoHideDuration: 2000,
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'right'
            },
            variant: 'error'
         }));
      });
   };
}
