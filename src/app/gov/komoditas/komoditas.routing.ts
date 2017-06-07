import { Routes, RouterModule }  from '@angular/router';

import { Komoditas } from './komoditas.component';
import { Tables } from './components/tables/tables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Komoditas,
    children: [
      { path: '', component: Tables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
