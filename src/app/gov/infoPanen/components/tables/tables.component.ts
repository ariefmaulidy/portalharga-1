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
      nama_komoditas: {
        title: 'Komoditas',
        type: 'string'
      },
      name: {
        title: 'Nama',
        type: 'string'
      },
      alamat: {
        title: 'Alamat',
        type: 'string'
      },
      keterangan: {
        title: 'Keterangan',
        type: 'number'
      },
      jumlah: {
        title: 'Jumlah',
        type: 'number'
      },
      satuan_komoditas: {
        title: 'Satuan',
        type: 'number'
      },
      date_panen: {
        title: 'Waktu Panen',
        type: 'number'
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
  
  private getProduksiFunction() {
    this.authHttp.get(this.data.urlGetProduksi)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('produksi', JSON.stringify(data.data));
        this.source.load(data.data);
        this.data.showMessage(data.message);
      })
  }

  private updateProduksiFunction(data) {
    let creds = JSON.stringify({ komoditas_id: data.komoditas_id, name: data.name, satuan: data.satuan, harga: data.harga });
    this.authHttp.post(this.data.urlUpdateProduksi, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })

    return 1;
  }

  private addProduksiFunction() {
    let creds = JSON.stringify({name: this.nama, satuan: this.satuan, harga: this.harga });
    this.authHttp.post(this.data.urlAddProduksi, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
  
        this.getProduksiFunction();
      })

    this.clearForm();
  }

  private deleteProduksiFunction() {
    let creds = JSON.stringify({komoditas_id: this.deleteId });
    this.authHttp.post(this.data.urlDeleteProduksi, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
  
        this.getProduksiFunction();
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
    if (localStorage.getItem('produksi')) {
      this.source.load(JSON.parse(localStorage.getItem('produksi')));
    }
    //get data from database
    this.getProduksiFunction();
  }

  onSaveConfirm(event): void {
    if(this.updateProduksiFunction(event.newData)){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
  
  onSubmitForm(){
    this.loading = true;
    this.submit = true;
    this.addProduksiFunction();
  }

  onDeleteConfirm(event): void {
    this.hapusText = "Apa anda yakin menghapus laporan harga " + event.data.namaKomoditas + ' dari ' + event.data.nama +' ?'
    this.deleteId = event.data.produksi_id;
    console.log(event.data.produksi_id);
  }
}
// irmusyafa.dev
