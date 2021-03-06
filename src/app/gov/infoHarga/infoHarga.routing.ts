import { Routes, RouterModule }  from '@angular/router';

import { InfoHarga } from './infoHarga.component';
import { Tables } from './components/tables/tables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: InfoHarga,
    children: [
      { path: '', component: Tables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
