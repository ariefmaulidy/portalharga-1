import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { BaMenuService } from '../theme';

@Component({
  selector: 'auth',
  template: `<router-outlet></router-outlet>`
})
export class Auth {
  public role;
  private decode;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private _menuService: BaMenuService,) {
  }

  private checkRole(){
    //checking role admin / pemerintah
    if (this.role === 1) {
      this.router.navigate(['/admin']);
    }
    else if(this.role === 2){
      this.router.navigate(['/pemerintah']);
    }
  }

  ngOnInit() {
  	if (localStorage.getItem('token')) {
      this.decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      this.role = this.decode.role;
      this.checkRole()
    }
  }
}
//irmusyafa.dev © 2017