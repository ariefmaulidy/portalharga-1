import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'style-loader!./tables.scss';

import { DataService } from '../../../../data/data.service';

@Component({
  selector: 'tables',
  providers: [DataService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tables.html',
})

export class Tables {
  public query: string = '';
  public jQuery:any;
  public loading = false;
  public submit = false;
  public hapusText;
  public deleteId;

  public harga;
  public nama;
  public satuan;
  settings = {
    add: {
      addButtonContent: '',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      namaKomoditas: {
        title: 'Komoditas',
        type: 'string'
      },
      nama: {
        title: 'Nama',
        type: 'string'
      },
      harga: {
        title: 'Harga (Rp)',
        type: 'number'
      },
      alamat: {
        title: 'Alamat',
        type: 'string'
      },
      datePost: {
        title: 'Waktu',
        type: 'string',
        editable: false,
        sortDirection: 'desc'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();
  
  private getLaporanHargaFunction() {
    this.authHttp.get(this.data.urlGetLaporanHarga)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('laporanHarga', JSON.stringify(data.data));
        this.source.load(data.data);
        console.log(data.data);
        this.data.showMessage(data.message);
      })
  }

  private updateLaporanHargaFunction(data) {
    let creds = JSON.stringify({ komoditas_id: data.komoditas_id, name: data.name, satuan: data.satuan, harga: data.harga });
    this.authHttp.post(this.data.urlUpdateLaporanHarga, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })

    return 1;
  }

  private addLaporanHargaFunction() {
    let creds = JSON.stringify({name: this.nama, satuan: this.satuan, harga: this.harga });
    this.authHttp.post(this.data.urlAddLaporanHarga, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
  
        this.getLaporanHargaFunction();
      })

    this.clearForm();
  }

  private deleteLaporanHargaFunction() {
    let creds = JSON.stringify({komoditas_id: this.deleteId });
    this.authHttp.post(this.data.urlDeleteLaporanHarga, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
  
        this.getLaporanHargaFunction();
      })

    this.clearForm();
  }

  clearForm(){
    this.nama = '';
    this.satuan = '';
    this.harga = '';    
    this.loading = false;
    this.submit = false;    
  }

  constructor(public authHttp: AuthHttp, public data: DataService) {
    //get data in localStorage('komoditas')
    if (localStorage.getItem('laporanHarga')) {
      this.source.load(JSON.parse(localStorage.getItem('laporanHarga')));
    }
    //get data from database
    this.getLaporanHargaFunction();
  }

  onSaveConfirm(event): void {
    if(this.updateLaporanHargaFunction(event.newData)){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
  
  onSubmitForm(){
    this.loading = true;
    this.submit = true;
    this.addLaporanHargaFunction();
  }

  onDeleteConfirm(event): void {
    this.hapusText = "Apa anda yakin menghapus laporan harga " + event.data.namaKomoditas + ' dari ' + event.data.nama +' ?'
    this.deleteId = event.data.laporanHarga_id;
    console.log(event.data.laporanHarga_id);
  }
}
// irmusyafa.dev
