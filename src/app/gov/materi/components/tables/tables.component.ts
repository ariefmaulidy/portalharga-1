import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthHttp } from 'angular2-jwt';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CustomEditorComponent } from './custom-editor.component';
import 'style-loader!./tables.scss';
import { Http, Headers } from '@angular/http';

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

  public judul;
  public keterangan;
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
        title: 'Nama Materi',
        type: 'string'
      },
      judul: {
        title: 'Judul',
        type: 'string'
      },
      keterangan: {
        title: 'Keterangan',
        type: 'string'
      },
      datePost: {
        title: 'Waktu',
        type: 'string'
      },
      link: {
        title: 'File',
        type: 'html'
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

  private getMateriFunction() {
    this.authHttp.get(this.data.urlGetMateri)
      .map(res => res.json())
      .subscribe(data => {
        for (var i = data.data.length - 1; i >= 0; i--) {
          data.data[i].link = "<a target='_blank' href='" + data.data[i].file + "'> Unduh </a>";
        }
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('materi', JSON.stringify(data.data));
        console.log(data.data);
        this.source.load(data.data);
        this.data.showMessage(data.message);
      })
  }

  private updateMateriFunction(data) {
    let creds = JSON.stringify({ komoditas_id: data.komoditas_id, name: data.name, satuan: data.satuan, harga: data.harga });
    this.authHttp.post(this.data.urlUpdateMateri, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })

    return 1;
  }

  private addMateriFunction() {
    let creds = 'judul=' + this.judul + '&keterangan=' + this.keterangan;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

    // let creds = JSON.stringify({judul: this.judul, keterangan: this.keterangan});
    // this.authHttp.post(this.data.urlAddMateri, creds, { headers: headers })
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     localStorage.setItem('id_token', data.token);
    //     this.data.showMessage(data.message);
    //     this.getMateriFunction();
    //     this.loading = false;
    //   })

    // this.clearForm();
    this.http.post(this.data.urlAddMateri, creds, {headers:headers})
      .map(res => res.json())
      .subscribe(data => {
          localStorage.setItem('id_token', data.token);
          this.data.showMessage(data.message);
          this.getMateriFunction();
          this.loading = false;
          this.add = false;
        }
      )
  }

  private deleteMateriFunction() {
    let creds = JSON.stringify({materi_id: this.deleteId });
    this.authHttp.post(this.data.urlDeleteMateri, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
        this.getMateriFunction();
      })

    this.clearForm();
  }

  public clearForm(){  
    this.loading = false;
    this.submit = false;
    this.add = false;
  }

  constructor( private http: Http, public authHttp: AuthHttp, public data: DataService) {
    //get data in localStorage('komoditas')
    if (localStorage.getItem('materi')) {
      this.source.load(JSON.parse(localStorage.getItem('materi')));
    }
    //get data from database
    this.getMateriFunction();
  }

  onSaveConfirm(event): void {
    if(this.updateMateriFunction(event.newData)){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
  
  onSubmitForm(){
    this.loading = true;
    this.submit = true;
    this.addMateriFunction();
  }

  onDeleteConfirm(event): void {
    this.hapusText = "Apa anda yakin menghapus materi " + event.data.judul + ' ?'
    this.deleteId = event.data.materi_id;
    // jQuery("#delete").modal("show");
    this.childModal.show();
  }
}
// irmusyafa.dev
