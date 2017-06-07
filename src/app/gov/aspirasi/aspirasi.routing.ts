import { Routes, RouterModule }  from '@angular/router';

import { Aspirasi } from './aspirasi.component';
import { Tables } from './components/tables/tables.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Aspirasi,
    children: [
      { path: '', component: Tables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
