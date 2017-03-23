import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DropdownModule} from 'ng2-bootstrap';

import { routing }       from './infoPanen.routing';
import { InfoPanen } from './infoPanen.component';
import { Maps } from './components/map/map.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { HoverTable } from './components/basicTables/components/hoverTable';

import { BasicTablesService } from './components/basicTables/basicTables.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    DropdownModule.forRoot()
  ],
  declarations: [
    InfoPanen,
    Maps,
    BasicTables,
    HoverTable
  ],
  providers: [
    BasicTablesService
  ]
})
export class InfoPanenModule {}
