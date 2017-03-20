import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
