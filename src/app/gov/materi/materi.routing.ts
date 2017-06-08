import { Routes, RouterModule }  from '@angular/router';

import { Materi } from './materi.component';
import { Tables } from './components/tables/tables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Materi,
    children: [
      { path: '', component: Tables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
