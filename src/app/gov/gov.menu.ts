export const PAGES_MENU = [
  {
    path: 'gov',
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
        path: 'maps',
        data: {
          menu: {
            title: 'Info Harga',
            icon: 'ion-person',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Map',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'Tabel',
              }
            }
          }
        ]
      },
      {
        path: 'editors',
        data: {
          menu: {
            title: 'Info Panen',
            icon: 'ion-leaf',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Map',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'Tabel',
              }
            }
          }
        ]
      },
      {
        path: 'Aspirasi',
        data: {
          menu: {
            title: 'Feedback',
            icon: 'ion-location',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Aspirasi',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'Operasi Pasar',
              }
            }
          }
        ]
      }
    ]
  }
];
