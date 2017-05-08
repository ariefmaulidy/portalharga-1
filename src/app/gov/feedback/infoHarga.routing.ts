import { Routes, RouterModule }  from '@angular/router';

import { InfoHarga } from './infoHarga.component';
import { Maps } from './components/map/map.component';
import { Tables } from './components/tables/tables.component';
import { OperasiPasar } from './components/operasiPasar/operasiPasar.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: InfoHarga,
    children: [
      { path: 'aspirasi', component: Tables },
      { path: 'operasiPasar', component: OperasiPasar }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
