import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'style-loader!./tables.scss';

import { DataService } from '../../../../data/data.service';
import { CustomEditorComponent } from '../../../../shared/custom-editor.component';
import { CustomRenderComponent } from '../../../../shared/custom-render.component';

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
      name: {
        title: 'Nama User',
        type: 'string'
      },
      subjek: {
        title: 'Subjek',
        type: 'number'
      },
      isi: {
        title: 'Aspirasi',
        type: 'string'
      }, 
      total_pendukung: {
        title: 'Total Pendukung',
        type: 'string'
      },
      datePost: {
        title: 'Date Post',
        type: 'string',
        editable: false,
        sortDirection: 'desc'
      },
      link: {
        title: '',
        type: 'html',
        editor: {
          type: 'custom',
          component: CustomEditorComponent,
        },
      },
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
  
  private getAspirasiFunction() {
    this.authHttp.get(this.data.urlGetAspirasi)
      .map(res => res.json())
      .subscribe(data => {
        for (var i = data.data.length - 1; i >= 0; i--) {
          data.data[i].link = "<a href='#/gov/tanggapan/aspirasi/" + data.data[i].aspirasi_id + "'>Tanggapi</a>";
        }
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('aspirasi', JSON.stringify(data.data));
        this.source.load(data.data);
        console.log(data.data);
        // this.data.showMessage(data.message);
      })
  }

  private updateAspirasiFunction(data) {
    let creds = JSON.stringify({ aspirasi_id: data.aspirasi_id, name: data.name, satuan: data.satuan, harga: data.harga });
    this.authHttp.post(this.data.urlUpdateAspirasi, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);
      })

    return 1;
  }

  private addAspirasiFunction() {
    let creds = JSON.stringify({name: this.nama, satuan: this.satuan, harga: this.harga });
    this.authHttp.post(this.data.urlAddAspirasi, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);        
        this.getAspirasiFunction();
      })

    this.clearForm();
  }

  private deleteAspirasiFunction() {
    let creds = JSON.stringify({aspirasi_id: this.deleteId });
    this.authHttp.post(this.data.urlDeleteAspirasi, creds)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        this.data.showMessage(data.message);        
        this.getAspirasiFunction();
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
    //get data in localStorage('aspirasi')
    if (localStorage.getItem('aspirasi')) {
      this.source.load(JSON.parse(localStorage.getItem('aspirasi')));
    }
    //get data from database
    this.getAspirasiFunction();
  }

  onSaveConfirm(event): void {
    if(this.updateAspirasiFunction(event.newData)){
      event.confirm.resolve();
    }else{
      event.confirm.reject();
    }
  }
  
  onSubmitForm(){
    this.loading = true;
    this.submit = true;
    this.addAspirasiFunction();
  }

  onDeleteConfirm(event): void {
    this.hapusText = "Apa anda yakin menghapus aspirasi " + event.data.name + ' ?'
    this.deleteId = event.data.aspirasi_id;    
  }
}
// irmusyafa.dev
