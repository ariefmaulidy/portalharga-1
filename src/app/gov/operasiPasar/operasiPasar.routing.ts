import { Routes, RouterModule }  from '@angular/router';

import { OperasiPasar } from './operasiPasar.component';
import { Tables } from './components/tables/tables.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: OperasiPasar,
    children: [
      { path: '', component: Tables },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
