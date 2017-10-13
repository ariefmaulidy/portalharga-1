import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import 'style-loader!./baPageTop.scss';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop {
  public photo = '';
  public decode;
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    console.log(this.decode.user_data);
    if (this.decode.user_data.picture) {
      this.photo = this.decode.user_data.picture;
    }else{
      this.photo = 'https://ph.yippytech.com/assets/img/app/profile/default.png';
    }
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public signout(){
    localStorage.removeItem('id_token');
    // localStorage.clear();
  }
}
