import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'style-loader!./tables.scss';

import { DataService } from '../../../../data/data.service';

@Component({
  selector: 'tables',
  providers: [DataService],
  templateUrl: './tables.html',
})

export class Tables {
  public dropdown;
  public user;
  public satu;
  public role:number = 1;
  query: string = '';
  public urlGetKomoditas = 'https://ph.yippytech.com:5000/user/get';
  
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
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      // role: {
      //   title: 'Role',
      //   type: 'string',
      //   editor: {
      //     type: 'list',
      //     config: {
      //       list: [
      //         { value: '1', title: 'Admin' }, 
      //         { value: '2', title: 'Pemerintah' }, 
      //         { value: '3', title: 'Penyuluh' }, 
      //         { value: '4', title: 'Petani' }, 
      //         { value: '5', title: 'Masyarakat' },
      //         { value: '6', title: 'Pedagang' }
      //       ]
      //     }
      //   }
      // },
      username: {
        title: 'Username',
        type: 'string',
        editable: false
      },
      name: {
        title: 'Nama lengkap',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      address: {
        title: 'Alamat',
        type: 'string',
        editor: {
          type: 'textarea'
        }
      },
      last_login: {
        title: 'Last Login',
        type: 'string',
        editable: false
      }
    },
    actions: {
      add: false,
    },
    pager: {
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();
  
  private getUserAllFunction() {
    this.authHttp.get(this.data.urlGetUserRole + this.role)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('user'+this.role, JSON.stringify(data.data));
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
        this.source.load(data.data);
      })
  }

  private updateUserFunction(data) {
    let creds = JSON.stringify({ komoditas_id: data.komoditas_id, name: data.name, satuan: data.satuan, harga: data.harga });
    this.authHttp.post(this.data.urlUpdateKomoditas, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })
  }

  // private addKomoditasFunction() {
  //   let creds = JSON.stringify({name: this.nama, satuan: this.satuan, harga: this.harga });
  //   this.authHttp.post(this.data.urlAddKomoditas, creds)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       localStorage.setItem('id_token', data.token);
  //       this.data.showMessage(data.message);
  //       jQuery("#tambah").modal("hide");
  //       this.getKomoditasFunction();
  //     })

  //   this.clearForm();
  // }

  // private deleteKomoditasFunction() {
  //   let creds = JSON.stringify({komoditas_id: this.deleteId });
  //   this.authHttp.post(this.data.urlDeleteKomoditas, creds)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       localStorage.setItem('id_token', data.token);
  //       this.data.showMessage(data.message);
  //       jQuery("#delete").modal("hide");
  //       this.getKomoditasFunction();
  //     })

  //   this.clearForm();
  // }
  setRole(id){
    this.role = id;
    this.dropdown = this.data.user[this.role - 1].text;
    if (localStorage.getItem('user'+this.role)) {
      this.source.load(JSON.parse(localStorage.getItem('user'+this.role)));
    }
    this.getUserAllFunction();
  }
  constructor(public authHttp: AuthHttp, public data: DataService) {
    this.dropdown = this.data.user[this.role - 1].text;
    this.user = this.data.user;
    if (localStorage.getItem('user'+this.role)) {
      this.source.load(JSON.parse(localStorage.getItem('user'+this.role)));
    }
    this.getUserAllFunction();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

