import { Routes, RouterModule }  from '@angular/router';
import { Admin } from './admin.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'user', loadChildren: 'app/admin/user/user.module#UserModule' },
      { path: 'dashboard', loadChildren: 'app/admin/dashboard/dashboard.module#DashboardModule' },
      { path: 'komoditas', loadChildren: 'app/gov/komoditas/komoditas.module#KomoditasModule' }
      ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
