import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DropdownModule} from 'ng2-bootstrap';

import { routing }       from './infoHarga.routing';
import { InfoHarga } from './infoHarga.component';
import { Tables } from './components/tables/tables.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    DropdownModule.forRoot(),
    Ng2SmartTableModule
  ],
  declarations: [
    InfoHarga,
    Tables
  ],
  providers: [
  ]
})
export class InfoHargaModule {}
