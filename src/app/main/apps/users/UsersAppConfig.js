import React from 'react';

export const UsersAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/users',
         component: React.lazy(() => import('./UsersApp'))
      }
   ]
};
