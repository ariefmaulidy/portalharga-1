import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = '#8bd22f';
    return [
      {
        color: pieColor,
        description: 'Masyarakat',
        stats: '15',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Penyuluh',
        stats: '5',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Petani',
        stats: '33',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Pedagang',
        stats: '5',
        icon: 'person',
      }
    ];
  }
}
