import React from 'react';

export const AgenciesAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/agencies',
         component: React.lazy(() => import('./AgenciesApp'))
      }
   ]
};
