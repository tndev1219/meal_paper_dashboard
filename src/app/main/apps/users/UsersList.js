import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useSelector } from 'react-redux';
import ReactTable from "react-table";
import moment from 'moment';

function UsersList(props) {
   const users = useSelector(({ usersApp }) => usersApp.users.entities);
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
               }
            ]}
            defaultPageSize={10}
            noDataText="No users found"
         />
      </FuseAnimate>
   );
}

export default UsersList;
