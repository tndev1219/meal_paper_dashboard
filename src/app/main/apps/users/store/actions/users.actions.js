import axios from 'axios';
import {showMessage} from 'app/store/actions';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_USERS = '[USERS] GET USERS';
export const SET_SEARCH_TEXT = '[USERS] SET SEARCH TEXT';

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
