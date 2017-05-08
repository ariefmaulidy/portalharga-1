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
        path: 'infoHarga',
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
            path: 'maps',
            data: {
              menu: {
                title: 'Map',
              }
            }
          },
          {
            path: 'tabel',
            data: {
              menu: {
                title: 'Tabel',
              }
            }
          }
        ]
      },
      {
        path: 'infoPanen',
        data: {
          menu: {
            title: 'Status Produksi',
            icon: 'ion-leaf',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'maps',
            data: {
              menu: {
                title: 'Map',
              }
            }
          },
          {
            path: 'tabel',
            data: {
              menu: {
                title: 'Tabel',
              }
            }
          }
        ]
      },
      {
        path: 'feedback',
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
            path: 'aspirasi',
            data: {
              menu: {
                title: 'Aspirasi',
              }
            }
          },
          {
            path: 'operasiPasar',
            data: {
              menu: {
                title: 'Operasi Pasar',
              }
            }
          }
        ]
      },
      {
        path: 'komoditas',
        data: {
          menu: {
            title: 'Komoditas',
            icon: 'ion-leaf',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
    ]
  }
];
