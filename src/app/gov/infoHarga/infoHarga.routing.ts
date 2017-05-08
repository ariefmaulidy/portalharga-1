import { Routes, RouterModule }  from '@angular/router';

import { InfoHarga } from './infoHarga.component';
import { Maps } from './components/map/map.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { Tables } from './components/tables/tables.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: InfoHarga,
    children: [
      { path: 'tabel', component: Tables },
      { path: 'maps', component: Maps }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
