import { Routes, RouterModule }  from '@angular/router';

import { InfoPanen } from './infoPanen.component';
import { Maps } from './components/map/map.component';
import { BasicTables } from './components/basicTables/basicTables.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: InfoPanen,
    children: [
      { path: 'tabel', component: BasicTables },
      { path: 'maps', component: Maps }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
