import { Routes, RouterModule }  from '@angular/router';

import { InfoPanen } from './infoPanen.component';
import { Maps } from './components/map/map.component';
import { Tables } from './components/tables/tables.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: InfoPanen,
    children: [
      { path: '', component: Tables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
