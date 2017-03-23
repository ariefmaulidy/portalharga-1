import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle:string = '';

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        console.log();
        if(activeLink.route.paths.length === 4){
          if (activeLink.route.paths[2] === 'infoHarga') {
            this.activePageTitle = "Info Harga " +activeLink.title;
          }else if(activeLink.route.paths[2] === 'infoPanen'){
            this.activePageTitle = "Info Panen " +activeLink.title;            
          }else if(activeLink.route.paths[2] === 'feedback'){
            this.activePageTitle = activeLink.title;            
          }
        }else{        
          this.activePageTitle = activeLink.title;
        }
      }
    });
  }
}
