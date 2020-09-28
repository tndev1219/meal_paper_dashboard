import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedSalutariumIds: [],
   salutariumDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   },
   agencies: []
};

const bedaccessoriesReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_SALUTARIUMS: {
         return {
            ...state,
            entities: _.clone(action.payload)
         };
      }
      case Actions.GET_AGENCIES: {
         return {
            ...state,
            agencies: action.payload
         };
      }
      case Actions.SET_SEARCH_TEXT: {
         return {
            ...state,
            searchText: action.searchText
         };
      }
      case Actions.TOGGLE_IN_SELECTED_SALUTARIUMS: {

         const salutariumId = action.salutariumId;

         let selectedSalutariumIds = [...state.selectedSalutariumIds];

         if (selectedSalutariumIds.find(id => id === salutariumId) !== undefined) {
            selectedSalutariumIds = selectedSalutariumIds.filter(id => id !== salutariumId);
         } else {
            selectedSalutariumIds = [...selectedSalutariumIds, salutariumId];
         }

         return {
            ...state,
            selectedSalutariumIds: selectedSalutariumIds
         };
      }
      case Actions.SELECT_ALL_SALUTARIUMS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedSalutariumIds = arr.map(salutarium => salutarium.id);

         return {
            ...state,
            selectedSalutariumIds: selectedSalutariumIds
         };
      }
      case Actions.DESELECT_ALL_SALUTARIUMS: {
         return {
            ...state,
            selectedSalutariumIds: []
         };
      }
      case Actions.OPEN_NEW_SALUTARIUM_DIALOG: {
         return {
            ...state,
            salutariumDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_SALUTARIUM_DIALOG: {
         return {
            ...state,
            salutariumDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_SALUTARIUM_DIALOG: {
         return {
            ...state,
            salutariumDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_SALUTARIUM_DIALOG: {
         return {
            ...state,
            salutariumDialog: {
               type: 'edit',
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

export default bedaccessoriesReducer;