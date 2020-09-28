import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import clsx from 'clsx';
import LoginTab from './tabs/LoginTab';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
   root: {
      background    : 'url("../assets/images/logos/top.jpg") no-repeat center center',
      backgroundSize: 'cover',
      color         : theme.palette.primary.contrastText
   }
}));

function Login()
{
   const classes = useStyles();

   return (
      <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

         <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
         </div>

         <FuseAnimate animation={{translateX: [0, '100%']}}>

            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

               <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                  <Typography variant="h6" className="text-center md:w-full mb-48">ログイン</Typography>

                  <LoginTab/>

               </CardContent>
            </Card>
         </FuseAnimate>
      </div>
   )
}

export default Login;
