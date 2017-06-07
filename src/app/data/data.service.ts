import { tokenNotExpired } from 'angular2-jwt';
import { ToastrService } from 'toastr-ng2';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class DataService {
  public user: Array<{id: number, text: string}> = [{id: 1, text: 'Admin'}, {id: 2, text: 'Pemerintah'}, {id: 3, text: 'Penyuluh'}, {id: 4, text: 'Petani '}, {id: 5, text: 'Masyarakat'}, {id: 6, text: 'Pedagang '}];
  // URL
  public baseUrl = 'https://ph.yippytech.com:5000'
  //-- komoditas
  public urlGetKomoditas    = this.baseUrl + '/komoditas/get';
  public urlAddKomoditas    = this.baseUrl + '/komoditas/add';
  public urlUpdateKomoditas = this.baseUrl + '/komoditas/update';
  public urlDeleteKomoditas = this.baseUrl + '/komoditas/delete';
  //-- user
  public urlGetUser       = this.baseUrl + '/user/get';
  public urlGetUserRole   = this.baseUrl + '/user/get/role/';
  public urlAddUser       = this.baseUrl + '/user/add';
  public urlUpdateUser    = this.baseUrl + '/user/update';
  public urlDeleteUser    = this.baseUrl + '/user/delete';
  //--laporanHarga
  public urlGetLaporanHarga       = this.baseUrl + '/laporanHarga/get';
  public urlGetLaporanHargaDay    = this.baseUrl + '/laporanHarga/get/day/';
  public urlAddLaporanHarga       = this.baseUrl + '/laporanHarga/add';
  public urlUpdateLaporanHarga    = this.baseUrl + '/laporanHarga/update';
  public urlDeleteLaporanHarga    = this.baseUrl + '/laporanHarga/delete';
  //--produksi
  public urlGetProduksi       = this.baseUrl + '/produksi/get/';
  public urlAddProduksi       = this.baseUrl + '/produksi/add';
  public urlUpdateProduksi    = this.baseUrl + '/produksi/update';
  public urlDeleteProduksi    = this.baseUrl + '/produksi/delete';
  //--aspirasi
  public urlGetAspirasi       = this.baseUrl + '/aspirasi/get/';
  public urlAddAspirasi       = this.baseUrl + '/aspirasi/add';
  public urlUpdateAspirasi    = this.baseUrl + '/aspirasi/update';
  public urlDeleteAspirasi    = this.baseUrl + '/aspirasi/delete';
  //--operasiPasar
  public urlGetOperasiPasar      = this.baseUrl + '/operasiPasar/get/';
  public urlAddOperasiPasar      = this.baseUrl + '/operasiPasar/add';
  public urlUpdateOperasiPasar   = this.baseUrl + '/operasiPasar/update';
  public urlDeleteOperasiPasar   = this.baseUrl + '/operasiPasar/delete';
  
  constructor(private router: Router,  private toastr: ToastrService){
    //logout if token expired
    if (!tokenNotExpired()) {
      localStorage.clear();
      this.router.navigate(['/']);
      this.showMessageError('Session Expired');
    }
  }

  public showMessage(message) {
    this.toastr.success(message,'Message!');
  }

  public showMessageSuccess(message) {
    this.toastr.success(message,'Success!');
  }

  public showMessageError(message) {
    this.toastr.error(message,'Error!');
  }
}
