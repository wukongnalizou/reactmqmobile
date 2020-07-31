const routes = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/demo',
        component: 'Demo',
      },
      {
        path: '/wxcode',
        component: 'Wxcode',
      },
      {
        path: '/getcode',
        component: 'GetCode'
      },
      {
        path: '/login',
        component: 'Login',
      },
      {
        path: '/index',
        component: 'Index',
        auth: true
      },
      {
        path: '/myGift',
        component: 'MyGift',
        auth: true
      },
      {
        path: '/winnersList',
        component: 'WinnersList',
        auth: true
      },
      {
        path: '/exchangesGoods',
        component: 'ExchangesGoods',
        auth: true
      },
      {
        path: '/mini',
        component: 'Miniprogram'
      }
    ],
  },
];
export default routes;
