import * as Actions from '../actions';
import authService from 'app/services/authService';

const profile = authService.getProfile()

const initialState = {
   data: {
      'displayName': profile && profile.name ? profile.name : 'Manager',
      'photoURL': 'assets/images/avatars/profile.jpg',
      'email': profile && profile.email,
      shortcuts: [
         'agencies',
         'salutariums',
         'users'
      ]
   }
};

const user = function (state = initialState, action) {
   switch (action.type) {
      case Actions.SET_USER_DATA: {
         return {
            ...initialState,
            ...action.payload
         };
      }
      case Actions.REMOVE_USER_DATA: {
         return {
            ...initialState
         };
      }
      case Actions.USER_LOGGED_OUT: {
         return initialState;
      }
      default: {
         return state
      }
   }
};

export default user;