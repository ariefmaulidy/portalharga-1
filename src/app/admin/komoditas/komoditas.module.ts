import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap/modal';
//routing
import { routing } from './komoditas.routing';
//components
import { Komoditas } from './komoditas.component';
import { Tables } from './components/tables/tables.component';
//service
import { TablesService } from './components/tables/tables.service';
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
    Komoditas,
    Tables
  ],
  providers: [
    TablesService,
    DataService
  ]
})
export class KomoditasModule {
}
