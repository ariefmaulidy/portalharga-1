import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './admin.menu';

@Component({
  selector: 'admin',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top> </ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="">Portal Harga | Admin Side</a> ©2017</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Admin {
  public role;
  private decode;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private _menuService: BaMenuService,) {
  }

  private checkRole(){
    //checking role admin / pemerintah
    if(this.role === 2){
      this.router.navigate(['/gov']);
    }
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    if (localStorage.getItem('token')) {
      this.decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      this.role = this.decode.role;
      this.checkRole()
    }else{
      this.router.navigate(['/']);
    }
  }
}
