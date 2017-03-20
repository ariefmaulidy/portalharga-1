import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './gov.routing';
import { NgaModule } from '../theme/nga.module';

import { Gov } from './gov.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Gov]
})
export class GovModule {
}
