import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PieChart } from './pieChart';
import { Feed } from './feed';
import { FeedService } from './feed/feed.service';
import { PieChartService } from './pieChart/pieChart.service';
import { Maps } from './map/map.component';
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
    PieChart,
    Feed,
    Maps,
    Dashboard
  ],
  providers: [
    FeedService,
    PieChartService
  ]
})
export class DashboardModule {}
