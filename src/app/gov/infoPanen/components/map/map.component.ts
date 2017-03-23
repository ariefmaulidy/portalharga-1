import {Component, ElementRef} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';

@Component({
  selector: 'map',
  styleUrls: ['./map.scss'],
  templateUrl: './map.html',
})
export class Maps {
  public marker:Array<Object>;
  constructor(private _elementRef:ElementRef) {
  }

  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.google-maps');
    // TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {
      var map = new google.maps.Map(el, {
        center: new google.maps.LatLng(-7.3226295,107.6627329),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var marker = new google.maps.Marker({
        position: {lat: -7.3226295, lng: 107.6627329},
        map: map,
        title: 'Hello World!'
      });

      let infoWindow = new google.maps.InfoWindow({
        content: `<h5>Cabai Merah</h5>
              <h6>Rp. 200,000 per Kg</h6>`
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }
}
