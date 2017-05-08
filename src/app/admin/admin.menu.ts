export const PAGES_MENU = [
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'user',
        data: {
          menu: {
            title: 'Pengguna',
            icon: 'ion-person',
            selected: false,
            expanded: false,
            order: 100,
          }
        }
      },
      {
        path: 'komoditas',
        data: {
          menu: {
            title: 'Komoditas',
            icon: 'ion-leaf',
            selected: false,
            expanded: false,
            order: 100,
          }
        }
      }
      // {
      //   path: 'editors',
      //   data: {
      //     menu: {
      //       title: 'Pasar',
      //       icon: 'ion-location',
      //       selected: false,
      //       expanded: false,
      //       order: 100,
      //     }
      //   }
      // }
    ]
  }
];
