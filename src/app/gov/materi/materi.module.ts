import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap/modal';

//routing
import { routing } from './materi.routing';
//components
import { Materi } from './materi.component';
import { Tables } from './components/tables/tables.component';
//service
import { DataService } from '../../data/data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    ModalModule.forRoot()
  ],
  declarations: [
    Materi,
    Tables
  ],
  providers: [
    DataService
  ]
})
export class MateriModule {
}
