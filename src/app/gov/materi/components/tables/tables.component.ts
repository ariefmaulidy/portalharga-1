import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthHttp } from 'angular2-jwt';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CustomEditorComponent } from './custom-editor.component';
import 'style-loader!./tables.scss';
import { Http, Headers, RequestOptions } from '@angular/http';

import { DataService } from '../../../../data/data.service';

@Component({
  selector: 'tables',
  providers: [DataService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tables.html',
})

export class Tables {
  @ViewChild('childModal') public childModal:ModalDirective;
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

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

  public filesToUpload: Array<File>;
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
        type: 'string',
        editor: {
          type: 'textarea'
        }
      },
      datePost: {
        title: 'Waktu',
        type: 'string',
        editable: false
      },
      link: {
        title: 'File',
        type: 'html',
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

  private getMateriFunction() {
    this.authHttp.get(this.data.urlGetMateri)
      .map(res => res.json())
      .subscribe(data => {
        for (var i = data.data.length - 1; i >= 0; i--) {
          data.data[i].link = "<a target='_blank' href='" + data.data[i].file + "'> Unduh </a><a target='_blank' href='" + data.data[i].file + "'> Update</a>";
        }
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('materi', JSON.stringify(data.data));
        console.log(data.data);
        this.source.load(data.data);
        this.data.showMessage(data.message);
      })
  }

  private updateMateriFunction(data) {
    console.log(data)
    let creds = JSON.stringify({ materi_id: data.materi_id, judul: data.judul, keterangan: data.keterangan});
    this.authHttp.post(this.data.urlUpdateMateri, creds)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })

    return 1;
  }

  upload() {
    this.loading = true;
    this.submit = true;
    this.makeFileRequest(this.data.urlAddMateri, [], this.filesToUpload).then((result) => {
        console.log(result);
    }, (error) => {
        console.error(error);
    });
  }
 
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>> fileInput.target.files;
      console.log(this.filesToUpload);
  }
 
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
      return new Promise((resolve, reject) => {
          var formData: any = new FormData();
          var xhr = new XMLHttpRequest();
          for(var i = 0; i < files.length; i++) {
              formData.append("file", files[i], files[i].name);
          }
          formData.append('judul',this.judul);
          formData.append('keterangan',this.keterangan);
          formData.append('token','Bearer ' + localStorage.getItem('id_token'));
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      resolve(JSON.parse(xhr.response));
                  } else {
                      reject(xhr.response);
                  }
              }
          }
          xhr.open("POST", url, true);
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token')); 
          xhr.send(formData);
      });
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
    this.judul = '';
    this.keterangan = '';
    this.loading = false;
    this.submit = false;
    this.add = false;
  }

  constructor( private http: Http, public authHttp: AuthHttp, public data: DataService) {
    //get data in localStorage('komoditas')
    this.filesToUpload = [];
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

  onDeleteConfirm(event): void {
    this.hapusText = "Apa anda yakin menghapus materi " + event.data.judul + ' ?'
    this.deleteId = event.data.materi_id;
    // jQuery("#delete").modal("show");
    this.childModal.show();
  }
}
// irmusyafa.dev
