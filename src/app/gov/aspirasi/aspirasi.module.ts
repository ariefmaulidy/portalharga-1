import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DropdownModule} from 'ng2-bootstrap';

import { routing }       from './aspirasi.routing';
import { Aspirasi } from './aspirasi.component';

import { Tables } from './components/tables/tables.component';
import { CustomEditorComponent } from '../../shared/custom-editor.component';
import { CustomRenderComponent } from '../../shared/custom-render.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    DropdownModule.forRoot(),
    Ng2SmartTableModule
  ],
  entryComponents: [CustomEditorComponent, CustomRenderComponent],
  declarations: [
    Aspirasi,
    Tables,
    CustomEditorComponent,
    CustomRenderComponent
  ],
  providers: [
  ]
})
export class AspirasiModule {}
