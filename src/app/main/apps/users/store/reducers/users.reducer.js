import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: ''
};

const usersReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_USERS: {
         return {
            ...state,
            entities: _.clone(action.payload)
         };
      }
      case Actions.SET_SEARCH_TEXT: {
         return {
            ...state,
            searchText: action.searchText
         };
      }
      default: {
         return state;
      }
   }
};

export default usersReducer;