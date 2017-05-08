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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/admin/dashboard/dashboard.module#DashboardModule' },
      { path: 'infoPanen', loadChildren: 'app/gov/infoPanen/infoPanen.module#InfoPanenModule' },
      { path: 'infoHarga', loadChildren: 'app/gov/infoHarga/infoHarga.module#InfoHargaModule' },
      { path: 'komoditas', loadChildren: 'app/admin/komoditas/komoditas.module#KomoditasModule' },
      { path: 'feedback', loadChildren: 'app/gov/feedback/infoHarga.module#InfoHargaModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
