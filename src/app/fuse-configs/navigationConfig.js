const navigationConfig = [
   {
      'type': 'divider',
      'id': 'divider-1'
   },
   {
      'id': 'applications',
      'title': 'オプション',
      'type': 'group',
      'icon': 'apps',
      'children': [{
         'id': 'agencies',
         'title': '代理店',
         'type': 'item',
         'icon': 'account_balance',
         'url': '/agencies'
      },
      {
         'id': 'salutariums',
         'title': '療養所',
         'type': 'item',
         'icon': 'hotel',
         'url': '/salutariums'
      },
      {
         'id': 'users',
         'title': 'ユーザー',
         'type': 'item',
         'icon': 'people',
         'url': '/users'
      }],
   },
   {
      'type': 'divider',
      'id': 'divider-2'
   }
];

export default navigationConfig;