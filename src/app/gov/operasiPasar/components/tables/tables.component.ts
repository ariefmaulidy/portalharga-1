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
        title: 'Nama User',
        type: 'string'
      },
      pesan: {
        title: 'Pesan',
        type: 'string'
      }, 
      alamat: {
        title: 'Alamat',
        type: 'string'
      }, 
      totalPendukung: {
        title: 'Total Pendukung',
        type: 'string'
      },
      datePost: {
        title: 'Date Post',
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
  
  private getOperasiPasarFunction() {
    this.authHttp.get(this.data.urlGetOperasiPasar)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('operasiPasar', JSON.stringify(data.data));
        this.source.load(data.data);
        console.log(data.data);
        this.data.showMessage(data.message);
      })
  }

  private updateOperasiPasarFunction(data) {
    let creds = JSON.stringify({ operasiPasar_id: data.operasiPasar_id, name: data.name, satuan: data.satuan, harga: data.harga });
    this.authHttp.post(this.data.urlUpdateOperasiPasar, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })

    return 1;
  }

  private addOperasiPasarFunction() {
    let creds = JSON.stringify({name: this.nama, satuan: this.satuan, harga: this.harga });
    this.authHttp.post(this.data.urlAddOperasiPasar, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);        
        this.getOperasiPasarFunction();
      })

    this.clearForm();
  }

  private deleteOperasiPasarFunction() {
    let creds = JSON.stringify({operasiPasar_id: this.deleteId });
    this.authHttp.post(this.data.urlDeleteOperasiPasar, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);        
        this.getOperasiPasarFunction();
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
    //get data in localStorage('operasiPasar')
    if (localStorage.getItem('operasiPasar')) {
      this.source.load(JSON.parse(localStorage.getItem('operasiPasar')));
    }
    //get data from database
    this.getOperasiPasarFunction();
  }

  onSaveConfirm(event): void {
    if(this.updateOperasiPasarFunction(event.newData)){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
  
  onSubmitForm(){
    this.loading = true;
    this.submit = true;
    this.addOperasiPasarFunction();
  }

  onDeleteConfirm(event): void {
    this.hapusText = "Apa anda yakin menghapus permintaan operasi pasar dari " + event.data.nama + ' di ' + event.data.alamat + ' ?'
    this.deleteId = event.data.operasiPasar_id;    
  }
}
// irmusyafa.dev
