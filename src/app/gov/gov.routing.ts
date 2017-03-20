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
      { path: 'dashboard', loadChildren: 'app/gov/dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: 'app/gov/editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: 'app/gov/components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: 'app/gov/charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: 'app/gov/ui/ui.module#UiModule' },
      { path: 'login', loadChildren: 'app/gov/login/login.module#LoginModule' },
      { path: 'forms', loadChildren: 'app/gov/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'app/gov/tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: 'app/gov/maps/maps.module#MapsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
