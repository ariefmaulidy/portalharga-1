import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Tanggapan } from './tanggapan.component';
import { routing }  from './tanggapan.routing';

import { DropdownModule} from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    DropdownModule.forRoot(),
    routing
  ],
  declarations: [
    Tanggapan
  ]
})
export class TanggapanModule {}
