import React from 'react';

export const SalutariumsAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/salutariums',
         component: React.lazy(() => import('./SalutariumsApp'))
      }
   ]
};
