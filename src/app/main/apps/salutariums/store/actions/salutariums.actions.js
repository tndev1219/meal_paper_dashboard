import axios from 'axios';
import { showMessage } from 'app/store/actions';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_SALUTARIUMS = '[SALUTARIUMS] GET SALUTARIUMS';
export const GET_AGENCIES = '[AGENCY] GET AGENCY TYPES';
export const SET_SEARCH_TEXT = '[SALUTARIUMS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SALUTARIUMS = '[SALUTARIUMS] TOGGLE IN SELECTED SALUTARIUMS';
export const SELECT_ALL_SALUTARIUMS = '[SALUTARIUMS] SELECT ALL SALUTARIUMS';
export const DESELECT_ALL_SALUTARIUMS = '[SALUTARIUMS] DESELECT ALL SALUTARIUMS';
export const OPEN_NEW_SALUTARIUM_DIALOG = '[SALUTARIUMS] OPEN NEW SALUTARIUM DIALOG';
export const CLOSE_NEW_SALUTARIUM_DIALOG = '[SALUTARIUMS] CLOSE NEW SALUTARIUM DIALOG';
export const OPEN_EDIT_SALUTARIUM_DIALOG = '[SALUTARIUMS] OPEN EDIT SALUTARIUM DIALOG';
export const CLOSE_EDIT_SALUTARIUM_DIALOG = '[SALUTARIUMS] CLOSE EDIT SALUTARIUM DIALOG';

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

export function getAgencies() {
   const request = axios.get(`${settingConfig.apiServerURL}/api/agency/`);

   return (dispatch) =>
      request.then((response) => {
         if (response.data.success) {
            dispatch({
               type: GET_AGENCIES,
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

export function toggleInSelectedSalutariums(salutariumId) {
   return {
      type: TOGGLE_IN_SELECTED_SALUTARIUMS,
      salutariumId
   };
}

export function selectAllSalutariums() {
   return {
      type: SELECT_ALL_SALUTARIUMS
   };
}

export function deSelectAllSalutariums() {
   return {
      type: DESELECT_ALL_SALUTARIUMS
   };
}

export function openNewSalutariumDialog() {
   return {
      type: OPEN_NEW_SALUTARIUM_DIALOG
   };
}

export function closeNewSalutariumDialog() {
   return {
      type: CLOSE_NEW_SALUTARIUM_DIALOG
   };
}

export function openEditSalutariumDialog(data) {
   return {
      type: OPEN_EDIT_SALUTARIUM_DIALOG,
      data
   };
}

export function closeEditSalutariumDialog() {
   return {
      type: CLOSE_EDIT_SALUTARIUM_DIALOG
   };
}

export function addSalutarium(newSalutarium) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/api/salutarium/`, newSalutarium);

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
            dispatch(getSalutariums());
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

export function updateSalutarium(salutarium) {
   return (dispatch) => {
      const request = axios.patch(`${settingConfig.apiServerURL}/api/salutarium/${salutarium.id}/`, salutarium);

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
            dispatch(getSalutariums());
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

export function removeSalutarium(salutariumId) {
   return (dispatch) => {
      const request = axios.delete(`${settingConfig.apiServerURL}/api/salutarium/${salutariumId}/`);

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
            dispatch(getSalutariums());
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

export function removeSalutariums(ids) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/api/salutarium/multiDel/`, { ids: ids });

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
                  type: DESELECT_ALL_SALUTARIUMS
               })
            ]).then(() => dispatch(getSalutariums()));
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
