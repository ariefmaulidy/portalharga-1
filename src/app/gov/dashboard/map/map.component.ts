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
  public dataMarker;
  public dataMarkerFilter;
  public komoditas;
  public selectKomoditas = 'Seluruh Komoditas';
  public markers = [];

  public interval;

  public day = 99;

  public url = this.data.urlGetLaporanHarga;
  public type = "infoHarga";
  public titleFeed = "Info Harga";

  // layout function

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
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

  constructor(private _elementRef:ElementRef, public authHttp: AuthHttp, public data: DataService) {
    this.getMarkerDataFunction();

    this.interval = setInterval(() => {
      this.getMarkerDataFunction();
    }, 5000);

    if (localStorage.getItem('komoditas')) {
      this.komoditas = JSON.parse(localStorage.getItem('komoditas'));
    }

    this.getKomoditasFunction();
  }

  //interface function

  public setType(type){
    this.type = type;
    if (type == 'infoHarga') {
      this.url = this.data.urlGetLaporanHargaDay + this.day;
      if (this.day == 99) {
        this.url = this.data.urlGetLaporanHarga;
      }
      this.titleFeed = 'INFO HARGA';
    }else{
      this.url = this.data.urlGetProduksi;
      this.titleFeed = 'INFO Panen';
    }
    this.getMarkerDataFunction();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }
  
  public setDay(day){
    this.day = day;
    this.url = this.data.urlGetLaporanHargaDay + this.day;
    if (this.day == 99) {
      this.url = this.data.urlGetLaporanHarga;
    }
    this.getMarkerDataFunction();
  }

  private setKomoditas(id){
    if (id == 'Komoditas') {
      this.selectKomoditas = "Seluruh " + id;
    } else{
      this.selectKomoditas = this.komoditas.find(x => x.komoditas_id == id).name;
    }
    this.loadMarker();
  }

  public clearMarker(){
    for (var i = this.markers.length - 1; i >= 0; i--) {
      this.markers[i].setMap(null);
    }
  }

  private formatDate(date){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var d = new Date(date);
    return d.toLocaleDateString("en-US",options);
  }

  private numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  }

  private loadMarker(){
    this.clearMarker();
    if (localStorage.getItem(this.type)) {
        this.dataMarker = JSON.parse(localStorage.getItem(this.type))

        if (this.selectKomoditas == 'Seluruh Komoditas') {
          this.dataMarkerFilter = this.dataMarker;
        }else{
          if (this.type == 'infoHarga') {
            this.dataMarkerFilter = this.dataMarker.filter(x => x.namaKomoditas == this.selectKomoditas)
          }else{
            this.dataMarkerFilter = this.dataMarker.filter(x => x.nama_komoditas == this.selectKomoditas)
          }
        }

        for (var i = this.dataMarkerFilter.length - 1; i >= 0; i--) {
          let content;
          let icon;
          if (this.type == 'infoHarga') {
            icon = 'https://ph.yippytech.com/assets/icon/marker/'+this.dataMarkerFilter[i].namaKomoditas.toLowerCase()+'.png';
            content = '<h3 style="color:#7fc623"> <i class="fa fa-leaf" aria-hidden="true"></i> ' + this.dataMarkerFilter[i].namaKomoditas + '</h3>' + 
              '<h1> Rp ' + this.numberWithCommas(this.dataMarkerFilter[i].harga) + ' /'+ this.dataMarkerFilter[i].satuan + ' </h1>' + 
              '<p><small>' + this.dataMarkerFilter[i].nama + '</small></p><i class="fa fa-map-marker" aria-hidden="true"></i> ' + 
              this.dataMarkerFilter[i].alamat + '<br><br>' + 
              '<small style="color:#7fc623">' + this.formatDate(this.dataMarkerFilter[i].datePost);            
          }else{
            icon = 'https://ph.yippytech.com/assets/icon/marker/'+this.dataMarkerFilter[i].nama_komoditas.toLowerCase()+'.png';
            content = '<h3 style="color:#7fc623"> <i class="fa fa-leaf" aria-hidden="true"></i> ' + this.dataMarkerFilter[i].nama_komoditas + '</h3>' +  
              '<p>' + this.dataMarkerFilter[i].jumlah + ' ' +this.dataMarkerFilter[i].satuan_komoditas + '</p>' +
              '<p><i class="fa fa-calendar-plus-o" aria-hidden="true"></i> Tanam ' + this.dataMarkerFilter[i].date_tanam +'<br><i class="fa fa-calendar-check-o" aria-hidden="true"></i> Panen '+ this.dataMarkerFilter[i].date_panen +'</p>'+
              '<p><small>' + this.dataMarkerFilter[i].name + '</small></p><i class="fa fa-map-marker" aria-hidden="true"></i> ' + 
              this.dataMarkerFilter[i].alamat + '<br>' + 
              this.dataMarkerFilter[i].keterangan + '<br><br>' + 
              '<small style="color:#7fc623">' + this.dataMarkerFilter[i].datePost; 
          }

          let infoWindow = new this.google.maps.InfoWindow({
            content: content,
            maxWidth: 225
          });

          var marker = new this.google.maps.Marker({
            position: {lat: this.dataMarkerFilter[i].latitude * 1, lng: this.dataMarkerFilter[i].longitude * 1},
            map: this.map,
            icon: icon,
            infowindow: infoWindow
          });

          this.markers.push(marker);
          this.google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(this.map, this);
          });

        }
      }
  }

  //data function

  private getKomoditasFunction() {
    this.authHttp.get(this.data.urlGetKomoditas)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('komoditas', JSON.stringify(data.data));
        this.komoditas = data.data;
      })
  }

  private getMarkerDataFunction() {
    this.authHttp.get(this.url)
      .map(res => res.json())
      .subscribe(data => {
        let length;

        if (JSON.stringify(this.dataMarker)) {
          length = JSON.stringify(this.dataMarker).length;
        }else{
          length = 0;
        }

        if (JSON.stringify(data.data) == '[]') {
            this.clearMarker;
            this.data.showMessageSuccess("Data Kosong");
        }

        if (length != JSON.stringify(data.data).length) {
          localStorage.setItem(this.type, JSON.stringify(data.data));
          localStorage.setItem('id_token', data.token);          
          this.loadMarker();

          if (data.status == 200) {
            this.data.showMessageSuccess("Memperbaharui Data");
          }else{
            this.data.showMessageError(data.message);
          }
        }
        console.log(data);
      })
  }
  
}
// irmusyafa.dev