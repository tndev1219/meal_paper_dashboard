import axios from 'axios';
import { showMessage } from 'app/store/actions';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_AGENCIES = '[AGENCIES] GET AGENCIES';
export const SET_SEARCH_TEXT = '[AGENCIES] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_AGENCIES = '[AGENCIES] TOGGLE IN SELECTED AGENCIES';
export const SELECT_ALL_AGENCIES = '[AGENCIES] SELECT ALL AGENCIES';
export const DESELECT_ALL_AGENCIES = '[AGENCIES] DESELECT ALL AGENCIES';
export const OPEN_NEW_AGENCY_DIALOG = '[AGENCIES] OPEN NEW AGENCY DIALOG';
export const CLOSE_NEW_AGENCY_DIALOG = '[AGENCIES] CLOSE NEW AGENCY DIALOG';
export const OPEN_EDIT_AGENCY_DIALOG = '[AGENCIES] OPEN EDIT AGENCY DIALOG';
export const CLOSE_EDIT_AGENCY_DIALOG = '[AGENCIES] CLOSE EDIT AGENCY DIALOG';

export function getAgencies() {
   const request = axios.get(`${settingConfig.apiServerURL}/api/agency/`);

   return (dispatch) =>
      request.then((response) => {
         if (!response.data.success) {
            dispatch(showMessage({
               message: '代理店の資料が見つかりません。',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else {
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

export function toggleInSelectedAgencies(agencyId) {
   return {
      type: TOGGLE_IN_SELECTED_AGENCIES,
      agencyId
   };
}

export function selectAllAgencies() {
   return {
      type: SELECT_ALL_AGENCIES
   };
}

export function deSelectAllAgencies() {
   return {
      type: DESELECT_ALL_AGENCIES
   };
}

export function openNewAgencyDialog() {
   return {
      type: OPEN_NEW_AGENCY_DIALOG
   };
}

export function closeNewAgencyDialog() {
   return {
      type: CLOSE_NEW_AGENCY_DIALOG
   };
}

export function openEditAgencyDialog(data) {
   return {
      type: OPEN_EDIT_AGENCY_DIALOG,
      data
   };
}

export function closeEditAgencyDialog() {
   return {
      type: CLOSE_EDIT_AGENCY_DIALOG
   };
}

export function addAgency(newAgency) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/api/agency/`, newAgency);

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
            dispatch(getAgencies());
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

export function updateAgency(agency) {
   return (dispatch) => {
      const request = axios.patch(`${settingConfig.apiServerURL}/api/agency/${agency.id}/`, agency);

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
            dispatch(getAgencies());
         }
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
         });
   };
}

export function removeAgency(agencyId) {
   return (dispatch) => {

      const request = axios.delete(`${settingConfig.apiServerURL}/api/agency/${agencyId}/`);

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
            dispatch(getAgencies());
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

export function removeAgencys(ids) {
   return (dispatch) => {
      const request = axios.post(`${settingConfig.apiServerURL}/api/agency/multiDel/`, { ids: ids });

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
                  type: DESELECT_ALL_AGENCIES
               })
            ]).then(() => dispatch(getAgencies()));
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
