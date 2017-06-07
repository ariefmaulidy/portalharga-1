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
      { path: 'operasi-pasar', loadChildren: 'app/gov/operasiPasar/operasiPasar.module#OperasiPasarModule' },
      { path: 'info-panen', loadChildren: 'app/gov/infoPanen/infoPanen.module#InfoPanenModule' },
      { path: 'info-harga', loadChildren: 'app/gov/infoHarga/infoHarga.module#InfoHargaModule' },
      { path: 'komoditas', loadChildren: 'app/admin/komoditas/komoditas.module#KomoditasModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
