import { Routes, RouterModule }  from '@angular/router';
import { Gov } from './gov.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };
export const routes: Routes = [
  {
    path: 'gov',
    component: Gov,
    children: [
      { path: '', redirectTo: 'beranda', pathMatch: 'full' },
      { path: 'beranda', loadChildren: 'app/gov/dashboard/dashboard.module#DashboardModule' },
      { path: 'aspirasi', loadChildren: 'app/gov/aspirasi/aspirasi.module#AspirasiModule' },
      { path: 'materi', loadChildren: 'app/gov/materi/materi.module#MateriModule' },
      { path: 'operasipasar', loadChildren: 'app/gov/operasiPasar/operasiPasar.module#OperasiPasarModule' },
      { path: 'info-panen', loadChildren: 'app/gov/infoPanen/infoPanen.module#InfoPanenModule' },
      { path: 'penyuluh', loadChildren: 'app/gov/user/user.module#UserModule' },
      { path: 'info-harga', loadChildren: 'app/gov/infoHarga/infoHarga.module#InfoHargaModule' },
      { path: 'komoditas', loadChildren: 'app/gov/komoditas/komoditas.module#KomoditasModule' },
      { path: 'tanggapan', loadChildren: 'app/gov/tanggapan/tanggapan.module#TanggapanModule' },
      { path: 'tanggapan/:type/:id', loadChildren: 'app/gov/tanggapan/tanggapan.module#TanggapanModule'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
