import {Component, ElementRef} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import { AuthHttp } from 'angular2-jwt';
import { DataService } from '../../../../data/data.service';

@Component({
  selector: 'map',
  providers: [DataService],
  styleUrls: ['./map.scss'],
  templateUrl: './map.html',
})
export class Maps {
  public marker:Array<Object>;
  public produksi;
  public komoditas;

  constructor(private _elementRef:ElementRef, public authHttp: AuthHttp, public data: DataService) {
    this.getProduksiFunction();
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

  private getProduksiFunction() {
    this.authHttp.get(this.data.urlGetProduksi)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('produksi', JSON.stringify(data.data));
        this.data.showMessage(data.message);
      })
  }
  
  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.google-maps');
    // TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {
      var map = new google.maps.Map(el, {
        center: new google.maps.LatLng(-6.558794,106.7310658),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      if (localStorage.getItem('produksi')) {
        this.produksi = JSON.parse(localStorage.getItem('produksi'))
        for (var i = this.produksi.length - 1; i >= 0; i--) {
          var marker = new google.maps.Marker({
            position: {lat: +this.produksi[i].latitude, lng: +this.produksi[i].longitude},
            map: map,
            icon: 'http://localhost:3000/assets/icon/marker/corn.png'
          });
          let infoWindow = new google.maps.InfoWindow({
            content: this.produksi[i].nama_komoditas + ' <br> ' + this.produksi[i].jumlahe + 'kg <br>' + this.produksi[i].datePost + ' <br> ' + this.produksi[i].alamat
          }); 
          // this.markers.push(marker)
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });  
        }
      }
    });
  }
}
