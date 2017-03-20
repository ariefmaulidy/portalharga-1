import { Routes, RouterModule }  from '@angular/router';

import { User } from './user.component';
import { Pemerintah } from './components/pemerintah/pemerintah.component';
import { Penyuluh } from './components/penyuluh/penyuluh.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: User,
    children: [
      { path: 'pemerintah', component: Pemerintah },
      { path: 'penyuluh', component: Penyuluh }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
