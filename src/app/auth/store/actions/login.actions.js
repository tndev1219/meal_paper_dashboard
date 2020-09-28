import authService from 'app/services/authService';
import { setInitialSettings, showMessage } from 'app/store/actions';
import history from '@history';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ username, password }) {
   return (dispatch) =>
      authService.signInWithEmailAndPassword(username, password)
         .then(() => {
            dispatch(setInitialSettings());

            if (history.location.state && history.location.state.redirectUrl) {
               history.push(history.location.state.redirectUrl);
            } else {
               history.push('/');
            }

            return dispatch({
               type: LOGIN_SUCCESS
            });
         })
         .catch(error => {
            dispatch(showMessage({
               message: '失敗しました。',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'error'
            }));

            return dispatch({
               type: LOGIN_ERROR,
               payload: error
            });
         });
}
