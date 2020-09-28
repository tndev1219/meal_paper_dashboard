import * as Actions from '../actions';

const initialState = {
   profileDialog: {
      props: {
         open: false
      },
      data: null
   }
};

const profileReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.OPEN_PROFILE_DIALOG: {
         return {
            ...state,
            profileDialog: {
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_PROFILE_DIALOG: {
         return {
            ...state,
            profileDialog: {
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      default: {
         return state;
      }
   }
};

export default profileReducer;