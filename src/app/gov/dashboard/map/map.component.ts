import {Component, ElementRef, HostListener} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import { AuthHttp } from 'angular2-jwt';
import { DataService } from '../../../data/data.service';

@Component({
  providers: [DataService],
  selector: 'map',
  styleUrls: ['./map.scss'],
  templateUrl: './map.html',
})
export class Maps {
  public map;
  public google;
  public dataHarga;
  public komoditas;
  public selectKomoditas = 'Seluruh Komoditas';
  public markers = [];

  public interval;
  public type = "infoHarga";
  public day = 0;


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  constructor(private _elementRef:ElementRef, public authHttp: AuthHttp, public data: DataService) {
    this.getInfoHargaFunction();

    this.interval = setInterval(() => {
      this.getInfoHargaFunction();
    }, 5000);

    if (localStorage.getItem('komoditas')) {
      this.komoditas = JSON.parse(localStorage.getItem('komoditas'));
    }

    this.getKomoditasFunction();
  }

  public setType(x){
    this.type = x;
  }

  public setDay(x){
    this.day = x;
  }

  public clearMarker(){
    for (var i = this.markers.length - 1; i >= 0; i--) {
      this.markers[i].setMap(null);
    }
  }

  private getKomoditasFunction() {
    this.authHttp.get(this.data.urlGetKomoditas)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('komoditas', JSON.stringify(data.data));
        this.komoditas = data.data;
      })
  }

  private getInfoHargaFunction() {
    this.authHttp.get(this.data.urlGetLaporanHarga)
      .map(res => res.json())
      .subscribe(data => {
        if (localStorage.getItem('infoHarga') != JSON.stringify(data.data)) {
          localStorage.setItem('infoHarga', JSON.stringify(data.data));
          localStorage.setItem('id_token', data.token);          
          this.loadMarker();
          this.data.showMessage(data.message);
        }
        console.log(data.data);
      })
  }

  private loadMarker(){
    this.clearMarker()
    if (localStorage.getItem('infoHarga')) {
        this.dataHarga = JSON.parse(localStorage.getItem('infoHarga'))

        if (this.selectKomoditas == 'Seluruh Komoditas') {
          var dataHargaLoop = this.dataHarga;
        }else{
          var dataHargaLoop = this.dataHarga.filter(x => x.namaKomoditas == this.selectKomoditas)
        }

        for (var i = dataHargaLoop.length - 1; i >= 0; i--) {
          let content = '<h3 style="color:#7fc623">' + dataHargaLoop[i].namaKomoditas + '</h3>' + 
            '<h1> Rp ' + this.numberWithCommas(dataHargaLoop[i].harga) + ' </h1>' + 
            '<p><small>' + dataHargaLoop[i].nama + '</small></p>' + 
            dataHargaLoop[i].alamat + '<br><br>' + 
            '<small style="color:#7fc623">' + this.formatDate(dataHargaLoop[i].datePost);

          let infoWindow = new this.google.maps.InfoWindow({
            content: content,
            maxWidth: 200
          });

          var marker = new this.google.maps.Marker({
            position: {lat: dataHargaLoop[i].latitude, lng: dataHargaLoop[i].longitude},
            map: this.map,
            icon: 'https://ph.yippytech.com/assets/icon/marker/'+dataHargaLoop[i].namaKomoditas.toLowerCase()+'.png',
            infowindow: infoWindow
          });

          this.markers.push(marker);
          this.google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(this.map, this);
          });

        }
      }
  }

  private formatDate(x){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var d = new Date(x);
    return d.toLocaleDateString("en-US",options);
  }

  private numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  }

  private setRole(id){
    if (id == 'Komoditas') {
      this.selectKomoditas = "Seluruh " + id;
    } else{
      this.selectKomoditas = this.komoditas.find(x => x.komoditas_id == id).name;
    }
    this.loadMarker();
  }

  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.google-maps');
    GoogleMapsLoader.load((google) => {
      this.google = google;

      this.map = new google.maps.Map(el, {
        center: new google.maps.LatLng(-6.558794,106.7310658),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      this.loadMarker();
    });
  }
}
// irmusyafa.dev