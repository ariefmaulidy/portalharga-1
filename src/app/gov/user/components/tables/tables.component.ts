import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
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

  public dropdown;
  public user;
  public satu;
  public role:number = 3;
  query: string = '';
  
  public add = false;
  public loading = false;
  public submit = false;
  public hapusText;

  public name;
  public username;
  public email;
  public password;
  public peran = 3; 

  public deleteId;

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
      }
      ,
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
  
  public showForm(x){
    this.name = '';
    this.username = '';
    this.password = '';
    this.email = '';
    this.add = x;
  }

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
    let creds = JSON.stringify({ user_id: data.user_id, name: data.name, email: data.email, address: data.address});
    this.authHttp.post(this.data.urlUpdateUser, creds)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data); 
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })      
    return 1;
  }

  private addUserFunction() {
    let creds = JSON.stringify({username: this.username, role: this.peran, password: this.password, email: this.email, name: this.name });
    this.authHttp.post(this.data.urlAddUser, creds)
      .map(res => res.json())
      .subscribe(data => {
        this.data.showMessageSuccess(data.message);
        this.getUserAllFunction();
        this.loading = false;
        this.submit = false;
        this.add = false;
      })
  }

  onSubmitForm(){
    this.loading = true;
    this.submit = true;
    this.addUserFunction();
  }

  private deleteUserFunction() {
    let creds = JSON.stringify({user_id: this.deleteId });
    this.authHttp.post(this.data.urlDeleteUser, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessageSuccess(data.message);
        this.getUserAllFunction();
      })
  }

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
    if (event.data.role == 1) {
      this.data.showMessageError('Tidak dapat menghapus akun admin');      
    }else{
      this.hapusText = "Apa anda yakin menghapus pengguna " + event.data.name + ' ?';
      this.deleteId = event.data.user_id;
      console.log(this.deleteId);
      // jQuery("#delete").modal("show");
      this.childModal.show();      
    }
  }

  onSaveConfirm(event): void {
    console.log(event.newData);
    if(this.updateUserFunction(event.newData)){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
}

