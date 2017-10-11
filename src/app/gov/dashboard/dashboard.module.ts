import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { Maps } from './map/map.component';
import { Feed } from './feed/feed.component';
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
    Maps,
    Dashboard
  ],
  providers: [
  ]
})
export class DashboardModule {}
