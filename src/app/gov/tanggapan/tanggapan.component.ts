import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthHttp } from 'angular2-jwt';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CustomEditorComponent } from './custom-editor.component';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../data/data.service';

@Component({
  selector: 'tanggapan',
  providers: [DataService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tanggapan.scss'],
  templateUrl: './tanggapan.html'
})
export class Tanggapan {
	public id: number;
	public delID;
	public type;
	private sub: any;
	
	public loading = false;
  	public submit = false;
	
	public temp

	public konten;
	public subjek;
	public tanggal;
	public pengguna;
	public pendukung;

	public tanggapan;
	public tatanggapan;

  	constructor(private http: Http, public authHttp: AuthHttp, public data: DataService, private route: ActivatedRoute) {
  		this.sub = this.route.params.subscribe(params => {
	       this.id = +params['id'];
	       this.type = params['type'];
	    });

	    if (this.id  && this.type) {
	    	if (this.type == 'aspirasi') {
	    		this.temp = JSON.parse(localStorage.getItem('aspirasi'));
	    		this.temp = this.temp.filter(x => x.aspirasi_id == this.id);
	    		this.konten = this.temp[0].isi;
	    		this.subjek = this.temp[0].subjek;
	    		this.tanggal = this.temp[0].datePost;
	    		this.pengguna = this.temp[0].name;
	    		this.pendukung = this.temp[0].pendukung.length;
	    		this.getTanggapanAspirasiFunction();
	    	}else if(this.type == 'operasipasar'){
	    		this.temp = JSON.parse(localStorage.getItem('operasiPasar'));
	    		this.temp = this.temp.filter(x => x.operasiPasar_id == this.id);
	    		this.konten = '[' + this.temp[0].namaKomoditas + '] ' + this.temp[0].pesan;
	    		this.subjek = this.temp[0].alamat;
	    		this.tanggal = this.temp[0].datePost;
	    		this.pengguna = this.temp[0].nama;
	    		this.pendukung = this.temp[0].pendukung.length;
	    		this.getTanggapanOperasiPasar();
	    	}
	    }
		console.log(this.temp);
  	}

  	private getTanggapanAspirasiFunction() {
    	this.authHttp.get(this.data.urlGetTanggapanAspirasi + this.id)
	      .map(res => res.json())
	      .subscribe(data => {
	      	console.log('sini');	
	        console.log(data.data);
	        this.tanggapan = data.data;
	      })
  	}

  	private getTanggapanOperasiPasar() {
    	this.authHttp.get(this.data.urlGetTanggapanOperasiPasar + this.id)
	      .map(res => res.json())
	      .subscribe(data => {
	      	console.log('masuk');
	        console.log(data.data);
	        this.tanggapan = data.data;
	      })
  	}

  	private onSubmitForm(){
  		this.loading = true;
    	this.submit = true;
    	if (this.type == 'aspirasi') {
  			this.addTanggapanAspirasiFunction();
    	}else if(this.type == 'operasipasar'){
  			this.addTanggapanOperasiPasarFunction();
    	}
  		this.clearForm();
  	}

  	public clearForm(){  
  		this.tatanggapan = '';
	    this.loading = false;
	    this.submit = false;
	}

  	private addTanggapanAspirasiFunction() {
	    let creds = JSON.stringify({aspirasi_id: this.id, isi: this.tatanggapan});
	    this.authHttp.post(this.data.urlAddTanggapanAspirasi, creds)
	      .map(res => res.json())
	      .subscribe(data => {
	        localStorage.setItem('id_token', data.token);
	        this.data.showMessage(data.message);
	        this.getTanggapanAspirasiFunction();
	      })

	    this.clearForm();
	}

	private addTanggapanOperasiPasarFunction() {
	    let creds = JSON.stringify({operasiPasar_id: this.id, isi: this.tatanggapan});
	    this.authHttp.post(this.data.urlAddTanggapanOperasiPasar, creds)
	      .map(res => res.json())
	      .subscribe(data => {
	        localStorage.setItem('id_token', data.token);
	        this.data.showMessage(data.message);
	        this.getTanggapanOperasiPasar();
	      })

	    this.clearForm();
	}

	private deleteTanggapanAspirasiFunction() {
	    let creds = JSON.stringify({aspirasi_id: this.id, _id: this.delID});
	    this.authHttp.post(this.data.urlDeleteTanggapanAspirasi, creds)
	      .map(res => res.json())
	      .subscribe(data => {
	        localStorage.setItem('id_token', data.token);
	        this.data.showMessage(data.message);
	        this.getTanggapanAspirasiFunction();
	      })

	    this.clearForm();
	}

	private deleteTanggapanOperasiPasarFunction() {
	    let creds = JSON.stringify({operasiPasar_id: this.id, _id: this.delID});
	    this.authHttp.post(this.data.urlDeleteTanggapanOperasiPasar, creds)
	      .map(res => res.json())
	      .subscribe(data => {
	        localStorage.setItem('id_token', data.token);
	        this.data.showMessage(data.message);
	        this.getTanggapanOperasiPasar();
	      })

	    this.clearForm();
	}

	private hapusTanggapan(_id){
		this.delID = _id;
		if (this.type == 'aspirasi') {
  			this.deleteTanggapanAspirasiFunction();
    	}else if(this.type == 'operasipasar'){
  			this.deleteTanggapanOperasiPasarFunction();
    	}
	}
}
