import {Component, ElementRef, HostListener} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import { AuthHttp } from 'angular2-jwt';
import { DataService } from '../../../../data/data.service';

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
  public selectKomoditas = 'Cabai';
  public markers:string[]=[];

  constructor(private _elementRef:ElementRef, public authHttp: AuthHttp, public data: DataService) {
    this.getInfoHargaFunction();

    if (localStorage.getItem('komoditas')) {
      this.komoditas = JSON.parse(localStorage.getItem('komoditas'));
    }

    this.getKomoditasFunction();
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
        localStorage.setItem('infoharga', JSON.stringify(data.data));
        localStorage.setItem('id_token', data.token);
        console.log(data.data);
        this.data.showMessage(data.message);
        this.loadMarker();
      })
  }

  private loadMarker(){
    if (localStorage.getItem('infoharga')) {
        this.dataHarga = JSON.parse(localStorage.getItem('infoharga'))

        if (this.selectKomoditas == 'Komoditas') {
          var dataHargaLoop = this.dataHarga;
        }else{
          var dataHargaLoop = this.dataHarga.filter(x => x.namaKomoditas == this.selectKomoditas)
        }
        for (var i = dataHargaLoop.length - 1; i >= 0; i--) {

          let infoWindow = new this.google.maps.InfoWindow({
            content: dataHargaLoop[i].namaKomoditas + ' <br> ' + dataHargaLoop[i].harga + '/kg <br>' + dataHargaLoop[i].datePost + ' <br> ' + dataHargaLoop[i].alamat
          });

          var marker = new this.google.maps.Marker({
            position: {lat: dataHargaLoop[i].latitude, lng: dataHargaLoop[i].longitude},
            map: this.map,
            icon: 'http://localhost:3000/assets/icon/marker/corn.png',
            infowindow: infoWindow
          });

          this.markers.push(marker);
          this.google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(this.map, this);
          });

        }
      }
  }
  
  private setRole(id){
    if (id == 'Komoditas') {
      this.selectKomoditas = id;
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