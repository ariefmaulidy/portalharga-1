import { Routes, RouterModule }  from '@angular/router';
import { Admin } from './admin.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'auth/login',
    loadChildren: 'app/auth/login/login.module#LoginModule'
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
