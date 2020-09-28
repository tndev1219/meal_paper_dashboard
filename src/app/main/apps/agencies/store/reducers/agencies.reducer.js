import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedAgencyIds: [],
   agencyDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const agenciesReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_AGENCIES: {
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
      case Actions.TOGGLE_IN_SELECTED_AGENCIES: {

         const agencyId = action.agencyId;

         let selectedAgencyIds = [...state.selectedAgencyIds];

         if (selectedAgencyIds.find(id => id === agencyId) !== undefined) {
            selectedAgencyIds = selectedAgencyIds.filter(id => id !== agencyId);
         } else {
            selectedAgencyIds = [...selectedAgencyIds, agencyId];
         }

         return {
            ...state,
            selectedAgencyIds: selectedAgencyIds
         };
      }
      case Actions.SELECT_ALL_AGENCIES: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedAgencyIds = arr.map(agency => agency.id);

         return {
            ...state,
            selectedAgencyIds: selectedAgencyIds
         };
      }
      case Actions.DESELECT_ALL_AGENCIES: {
         return {
            ...state,
            selectedAgencyIds: []
         };
      }
      case Actions.OPEN_NEW_AGENCY_DIALOG: {
         return {
            ...state,
            agencyDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_AGENCY_DIALOG: {
         return {
            ...state,
            agencyDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_AGENCY_DIALOG: {
         return {
            ...state,
            agencyDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_AGENCY_DIALOG: {
         return {
            ...state,
            agencyDialog: {
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

export default agenciesReducer;