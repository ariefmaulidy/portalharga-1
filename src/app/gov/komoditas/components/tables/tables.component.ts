import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { ModalDirective } from 'ngx-bootstrap/modal';

import 'style-loader!./tables.scss';

import { DataService } from '../../../../data/data.service';

@Component({
  selector: 'tables',
  providers: [DataService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tables.html',
})

export class Tables {
  @ViewChild('childModal') public childModal:ModalDirective;

  public query: string = '';
  public jQuery:any;
  public loading = false;
  public submit = false;
  public hapusText;
  public deleteId;
  public add = false;
  public delete = false;

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
      name: {
        title: 'Nama Komoditas',
        type: 'string'
      },
      harga: {
        title: 'Harga (Rp)',
        type: 'number'
      },
      satuan: {
        title: 'Satuan',
        type: 'number',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Kg', title: 'Kg' }, { value: 'Liter', title: 'Liter' }, {
              value: 'Kwintal',
              title: 'Kwintal',
            }],
          }
        }
      },
      last_update: {
        title: 'Last Update',
        type: 'string',
        editable: false
      }
    },
    pager: {
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();
  
  public showForm(x){
    this.add = x;
    this.nama = '';
    this.satuan = '';
    this.harga = '';  
  }

  private getKomoditasFunction() {
    this.authHttp.get(this.data.urlGetKomoditas)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('komoditas', JSON.stringify(data.data));
        this.source.load(data.data);
        this.data.showMessage(data.message);
      })
  }

  private updateKomoditasFunction(data) {
    let creds = JSON.stringify({ komoditas_id: data.komoditas_id, name: data.name, satuan: data.satuan, harga: data.harga });
    this.authHttp.post(this.data.urlUpdateKomoditas, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })

    return 1;
  }

  private addKomoditasFunction() {
    let creds = JSON.stringify({name: this.nama, satuan: this.satuan, harga: this.harga });
    this.authHttp.post(this.data.urlAddKomoditas, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
        this.getKomoditasFunction();
      })

    this.clearForm();
  }

  private deleteKomoditasFunction() {
    let creds = JSON.stringify({komoditas_id: this.deleteId });
    this.authHttp.post(this.data.urlDeleteKomoditas, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
        this.getKomoditasFunction();
      })

    this.clearForm();
  }

  public clearForm(){  
    this.loading = false;
    this.submit = false;
    this.add = false;
  }

  constructor(public authHttp: AuthHttp, public data: DataService) {
    //get data in localStorage('komoditas')
    if (localStorage.getItem('komoditas')) {
      this.source.load(JSON.parse(localStorage.getItem('komoditas')));
    }
    //get data from database
    this.getKomoditasFunction();
  }

  onSaveConfirm(event): void {
    if(this.updateKomoditasFunction(event.newData)){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
  
  onSubmitForm(){
    this.loading = true;
    this.submit = true;
    this.addKomoditasFunction();
  }

  onDeleteConfirm(event): void {
    this.hapusText = "Apa anda yakin menghapus komoditas " + event.data.name + ' ?'
    this.deleteId = event.data.komoditas_id;
    // jQuery("#delete").modal("show");
    this.childModal.show();
  }
}
// irmusyafa.dev
