import React from 'react';

export const Error404PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/error',
            component: React.lazy(() => import('./Error404Page'))
        }
    ]
};
