import { Routes, RouterModule }  from '@angular/router';

import { User } from './user.component';
import { Tables } from './components/tables/tables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: User,
    children: [
      { path: '', component: Tables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
