import {Component} from '@angular/core';

import {PieChartService} from './pieChart.service';
import { DataService } from '../../../data/data.service';
import { AuthHttp } from 'angular2-jwt';

import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./pieChart.scss';

@Component({
  providers: [DataService],
  selector: 'pie-chart',
  templateUrl: './pieChart.html'
})
// TODO: move easypiechart to component
export class PieChart {

  public charts: Array<Object>;
  private _init = false;
  private color = '#8bd22f';

  public dataku;
  constructor(private _pieChartService: PieChartService, public authHttp: AuthHttp, public data: DataService) {
    this.charts = this._pieChartService.getData();
    this.getDashboardFunction();
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private getDashboardFunction() {
    this.authHttp.get(this.data.urlGetDashboard)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        let userCount = data.data.pedagang*1 + data.data.penyuluh*1 + data.data.petani*1 + data.data.masyarakat*1;
        let temp = [
              {
              'id':'pedagang',
              'jumlah':data.data.pedagang,
              'persentase':data.data.pedagang/userCount*100
              },
              {
              'id':'penyuluh',
              'jumlah':data.data.penyuluh,
              'persentase':data.data.penyuluh/userCount*100
              },
              {
              'id':'petani',
              'jumlah':data.data.petani,
              'persentase':data.data.petani/userCount*100
              },
              {
              'id':'masyarakat',
              'jumlah':data.data.masyarakat,
              'persentase':data.data.masyarakat/userCount*100
              },
            ];
        localStorage.setItem('dashboard', JSON.stringify(temp));
        this.dataku = temp;
      });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
