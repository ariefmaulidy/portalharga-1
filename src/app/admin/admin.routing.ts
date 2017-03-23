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
      { path: 'dashboard', loadChildren: 'app/admin/dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: 'app/admin/editors/editors.module#EditorsModule' },
      { path: 'user', loadChildren: 'app/admin/user/user.module#UserModule' },
      { path: 'ui', loadChildren: 'app/admin/ui/ui.module#UiModule' }
      ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
