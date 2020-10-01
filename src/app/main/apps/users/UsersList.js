import React, { useEffect, useState } from 'react';
import { Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from './store/actions';
import UsersMultiSelectMenu from './UsersMultiSelectMenu';

function UsersList(props) {
   const dispatch = useDispatch();
   const users = useSelector(({ usersApp }) => usersApp.users.entities);
   const selectedUserIds = useSelector(({ usersApp }) => usersApp.users.selectedUserIds);
   const searchText = useSelector(({ usersApp }) => usersApp.users.searchText);

   const [filteredData, setFilteredData] = useState(null);

   useEffect(() => {
      function getFilteredArray(entities, searchText) {
         const arr = Object.keys(entities).map((id) => entities[id]);
         if (searchText.length === 0) {
            return arr;
         }
         return FuseUtils.filterArrayByString(arr, searchText);
      }

      if (users) {
         setFilteredData(getFilteredArray(users, searchText));
      }
   }, [users, searchText]);


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
            data={filteredData}
            columns={[
               {
                  Header: () => (
                     <Checkbox
                        onClick={(event) => {
                           event.stopPropagation();
                        }}
                        onChange={(event) => {
                           event.target.checked ? dispatch(Actions.selectAllUsers()) : dispatch(Actions.deSelectAllUsers());
                        }}
                        checked={selectedUserIds.length === Object.keys(users).length && selectedUserIds.length > 0}
                        indeterminate={selectedUserIds.length !== Object.keys(users).length && selectedUserIds.length > 0}
                     />
                  ),
                  accessor: "",
                  Cell: row => {
                     return (<Checkbox
                        onClick={(event) => {
                           event.stopPropagation();
                        }}
                        checked={selectedUserIds.includes(row.value.id)}
                        onChange={() => dispatch(Actions.toggleInSelectedUsers(row.value.id))}
                     />
                     )
                  },
                  className: "justify-center",
                  sortable: false,
                  width: 64
               },
               {
                  Header: () => (
                     selectedUserIds.length > 0 && (
                        <UsersMultiSelectMenu />
                     )
                  ),
                  accessor: "",
                  Cell: row => (<div />),
                  className: "justify-center",
                  width: 61,
                  sortable: false
               },
               {
                  Header: "ユーザー名",
                  accessor: "name",
                  filterable: true,
                  className: "font-bold"
               },
               {
                  Header: "所属施設",
                  accessor: "salutarium_name",
                  filterable: true,
               },
               {
                  Header: "メールアドレス",
                  accessor: "email",
                  filterable: true
               },
               {
                  Header: "役割",
                  accessor: "role",
                  Cell: row => {
                     return (
                        <div>
                           {
                              row.value === 1 ? '入居者'
                                 :
                                 row.value === 2 ? '栄養士'
                                    :
                                    row.value === 3 ? '厨房'
                                       :
                                       row.value === 4 ? '看護婦'
                                          :
                                          null
                           }
                        </div>
                     )
                  },
                  filterable: true,
                  className: "font-bold"
               },
               {
                  Header: "連絡先",
                  accessor: "contact",
                  filterable: true
               },
               {
                  Header: "緊急連絡先",
                  accessor: "emergency_contact",
                  filterable: true
               },
               {
                  Header: "会社",
                  accessor: "emergency_contact",
                  filterable: true
               },
               {
                  Header: "住所",
                  accessor: "address",
                  filterable: true
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
                              dispatch(Actions.removeUser(row.original.id));
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
            noDataText="No users found"
         />
      </FuseAnimate>
   );
}

export default UsersList;
