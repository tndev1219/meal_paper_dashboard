import React, { useEffect, useState } from 'react';
import { Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from './store/actions';
import AgenciesMultiSelectMenu from './AgenciesMultiSelectMenu';

function AgenciesList(props) {
   const dispatch = useDispatch();
   const agencies = useSelector(({ agenciesApp }) => agenciesApp.agencies.entities);
   const selectedAgencyIds = useSelector(({ agenciesApp }) => agenciesApp.agencies.selectedAgencyIds);
   const searchText = useSelector(({ agenciesApp }) => agenciesApp.agencies.searchText);

   const [filteredData, setFilteredData] = useState(null);

   useEffect(() => {
      function getFilteredArray(entities, searchText) {
         const arr = Object.keys(entities).map((id) => entities[id]);
         if (searchText.length === 0) {
            return arr;
         }
         return FuseUtils.filterArrayByString(arr, searchText);
      }

      if (agencies) {
         setFilteredData(getFilteredArray(agencies, searchText));
      }
   }, [agencies, searchText]);


   if (!filteredData) {
      return null;
   }

   if (filteredData.length === 0) {
      return (
         <FuseAnimate animation="transition.expandIn" delay={300}>
            <div className="flex flex-1 items-center justify-center h-full">
               <Typography color="textSecondary" variant="h5">
                  資料がありません。
               </Typography>
            </div>
         </FuseAnimate>
      );
   }

   return (
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
         <ReactTable
            className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
            getTrProps={(state, rowInfo, column) => {
               return {
                  className: "cursor-pointer",
                  onClick: (e, handleOriginal) => {
                     if (rowInfo) {
                        dispatch(Actions.openEditAgencyDialog(rowInfo.original));
                     }
                  }
               }
            }}
            data={filteredData}
            columns={[
               {
                  Header: () => (
                     <Checkbox
                        onClick={(event) => {
                           event.stopPropagation();
                        }}
                        onChange={(event) => {
                           event.target.checked ? dispatch(Actions.selectAllAgencies()) : dispatch(Actions.deSelectAllAgencies());
                        }}
                        checked={selectedAgencyIds.length === Object.keys(agencies).length && selectedAgencyIds.length > 0}
                        indeterminate={selectedAgencyIds.length !== Object.keys(agencies).length && selectedAgencyIds.length > 0}
                     />
                  ),
                  accessor: "",
                  Cell: row => {
                     return (<Checkbox
                        onClick={(event) => {
                           event.stopPropagation();
                        }}
                        checked={selectedAgencyIds.includes(row.value.id)}
                        onChange={() => dispatch(Actions.toggleInSelectedAgencies(row.value.id))}
                     />
                     )
                  },
                  className: "justify-center",
                  sortable: false,
                  width: 64
               },
               {
                  Header: () => (
                     selectedAgencyIds.length > 0 && (
                        <AgenciesMultiSelectMenu />
                     )
                  ),
                  accessor: "",
                  Cell: row => {
                     return (<div />)
                  },
                  className: "justify-center",
                  sortable: false,
                  width: 64
               },
               {
                  Header: "代理店コード",
                  accessor: "code",
                  filterable: true,
                  className: "font-bold"
               },
               {
                  Header: "代理店名",
                  accessor: "name",
                  filterable: true,
                  className: "font-bold"
               },
               {
                  Header: "担当者",
                  accessor: "treasurer_name",
                  filterable: true,
                  className: "font-bold"
               },
               {
                  Header: "連絡先",
                  accessor: "contact",
                  filterable: true,
                  className: "font-bold"
               },
               {
                  Header: "登録日付",
                  accessor: "created_at",
                  Cell: row => {
                     return (<div>{moment(row.value).format('YYYY-MM-DD h:mm:ss')}</div>)
                  },
                  filterable: true
               },
               {
                  Header: "",
                  width: 64,
                  Cell: row => (
                     <div className="flex items-center">
                        <IconButton
                           onClick={(ev) => {
                              ev.stopPropagation();
                              dispatch(Actions.removeAgency(row.original.id));
                           }}
                        >
                           <Icon>delete</Icon>
                        </IconButton>
                     </div>
                  ),
                  className: "justify-center",
               }
            ]}
            defaultPageSize={10}
            noDataText="No agencies found"
         />
      </FuseAnimate>
   );
}

export default AgenciesList;
