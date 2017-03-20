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
        description: 'User',
        stats: '57,820',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Penyuluh',
        stats: '89,745',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Petani',
        stats: '178,391',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Pedagang',
        stats: '32,592',
        icon: 'person',
      }
    ];
  }
}
