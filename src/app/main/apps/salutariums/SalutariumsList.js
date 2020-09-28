import React, { useEffect, useState } from 'react';
import { Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from './store/actions';
import SalutariumsMultiSelectMenu from './SalutariumsMultiSelectMenu';

function SalutariumsList(props) {
   const dispatch = useDispatch();
   const salutariums = useSelector(({ salutariumsApp }) => salutariumsApp.salutariums.entities);
   const selectedSalutariumIds = useSelector(({ salutariumsApp }) => salutariumsApp.salutariums.selectedSalutariumIds);
   const searchText = useSelector(({ salutariumsApp }) => salutariumsApp.salutariums.searchText);

   const [filteredData, setFilteredData] = useState(null);

   useEffect(() => {
      function getFilteredArray(entities, searchText) {
         const arr = Object.keys(entities).map((id) => entities[id]);
         if (searchText.length === 0) {
            return arr;
         }
         return FuseUtils.filterArrayByString(arr, searchText);
      }

      if (salutariums) {
         setFilteredData(getFilteredArray(salutariums, searchText));
      }
   }, [salutariums, searchText]);


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
                        dispatch(Actions.openEditSalutariumDialog(rowInfo.original));
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
                           event.target.checked ? dispatch(Actions.selectAllSalutariums()) : dispatch(Actions.deSelectAllSalutariums());
                        }}
                        checked={selectedSalutariumIds.length === Object.keys(salutariums).length && selectedSalutariumIds.length > 0}
                        indeterminate={selectedSalutariumIds.length !== Object.keys(salutariums).length && selectedSalutariumIds.length > 0}
                     />
                  ),
                  accessor: "",
                  Cell: row => {
                     return (<Checkbox
                        onClick={(event) => {
                           event.stopPropagation();
                        }}
                        checked={selectedSalutariumIds.includes(row.value.id)}
                        onChange={() => dispatch(Actions.toggleInSelectedSalutariums(row.value.id))}
                     />
                     )
                  },
                  className: "justify-center",
                  sortable: false,
                  width: 64
               },
               {
                  Header: () => (
                     selectedSalutariumIds.length > 0 && (
                        <SalutariumsMultiSelectMenu />
                     )
                  ),
                  accessor: "",
                  Cell: row => (<div />),
                  className: "justify-center",
                  width: 61,
                  sortable: false
               },
               {
                  Header: "代理店",
                  accessor: "agency_name",
                  filterable: true,
                  className: "font-bold"
               },
               {
                  Header: "療養所",
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
                              dispatch(Actions.removeSalutarium(row.original.id));
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
            noDataText="No bed covers found"
         />
      </FuseAnimate>
   );
}

export default SalutariumsList;
