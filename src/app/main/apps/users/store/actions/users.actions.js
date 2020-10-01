import axios from 'axios';
import { showMessage } from 'app/store/actions';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_USERS = '[USERS] GET USERS';
export const GET_SALUTARIUMS = '[USERS] GET SALUTARIUMS';
export const SET_SEARCH_TEXT = '[USERS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_USERS = '[USERS] TOGGLE IN SELECTED USERS';
export const SELECT_ALL_USERS = '[USERS] SELECT ALL USERS';
export const DESELECT_ALL_USERS = '[USERS] DESELECT ALL USERS';
export const OPEN_NEW_USER_DIALOG = '[USERS] OPEN NEW USER DIALOG';
export const CLOSE_NEW_USER_DIALOG = '[USERS] CLOSE NEW USER DIALOG';


export function getSalutariums() {
   const request = axios.get(`${settingConfig.apiServerURL}/api/salutarium/`);

   return (dispatch) =>
      request.then((response) => {
         if (!response.data.success) {
            dispatch(showMessage({
               message: '療養所の資料が見つかりません。',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else {
            dispatch({
               type: GET_SALUTARIUMS,
               payload: response.data.result
            });
         }
      }).catch(error => {
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
}

export function getUsers() {
   const request = axios.get(`${settingConfig.apiServerURL}/api/update-profile/getAll/`);

   return (dispatch) =>
      request.then((response) => {
         if (!response.data.success) {
            dispatch(showMessage({
               message: 'ユーザー資料が見つかりません。',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else {
            dispatch({
               type: GET_USERS,
               payload: response.data.result
            });
         }
      });
}

export function setSearchText(event) {
   return {
      type: SET_SEARCH_TEXT,
      searchText: event.target.value
   };
}

export function toggleInSelectedUsers(userId) {
   return {
      type: TOGGLE_IN_SELECTED_USERS,
      userId
   };
}

export function selectAllUsers() {
   return {
      type: SELECT_ALL_USERS
   };
}

export function deSelectAllUsers() {
   return {
      type: DESELECT_ALL_USERS
   };
}

export function openNewUserDialog() {
   return {
      type: OPEN_NEW_USER_DIALOG
   };
}

export function closeNewUserDialog() {
   return {
      type: CLOSE_NEW_USER_DIALOG
   };
}

export function addUser(newUser) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/api/auth-users/signup/`, newUser);

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
            dispatch(getUsers());
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

export function removeUser(userId) {
   return (dispatch) => {
      const request = axios.delete(`${settingConfig.apiServerURL}/api/update-profile/${userId}/`);

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
            dispatch(getUsers());
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

export function removeUsers(ids) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/api/update-profile/multiDel/`, { ids: ids });

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

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_USERS
               })
            ]).then(() => dispatch(getUsers()));
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
