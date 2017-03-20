import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//routing
import { routing }       from './user.routing';
//components
import { User } from './user.component';
import { Pemerintah } from './components/pemerintah/pemerintah.component';
import { Penyuluh } from './components/penyuluh/penyuluh.component';
//service
import { PemerintahService } from './components/pemerintah/pemerintah.service';
import { PenyuluhService } from './components/penyuluh/penyuluh.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    User,
    Pemerintah,
    Penyuluh
  ],
  providers: [
    PemerintahService,
    PenyuluhService,
  ]
})
export class UserModule {
}
