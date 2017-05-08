import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})

export class Login {
  public role;
  private decode;
  public data:string;

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  jwtHelper: JwtHelper = new JwtHelper();

  public urlLogin = 'https://ph.yippytech.com:5000/user/auth';

  headers = new Headers({
    'Content-Type' : 'application/json'
  });

  constructor(private router: Router, fb:FormBuilder, private http: Http, private toastr: ToastrService) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  private authHttpFunction(username, password) {
    
    let creds = JSON.stringify({ username: username.value, password: password.value, login_type: 0 });

    this.http.post(this.urlLogin, creds, {headers:this.headers})
      .map(res => res.json())
      .subscribe(data => {
          this.showMessage(data.message);
          if(data.success === true){
            localStorage.setItem('id_token', data.token);
            this.checkRole();
          }
        },
        err =>{
          this.showMessage(err.message);
        }
      )
  }

  private showMessage(message) {
    //showtoastr
    this.toastr.info(message);
  }

  private checkRole(){
    //decode token form localStorage('id_token')
    this.decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    this.role = this.decode.role; 
    //checking role admin / pemerintah
    if (this.role === 1) {
      this.router.navigate(['/admin']);
    }
    else if(this.role === 2){
      this.router.navigate(['/gov']);
    }
  }

  private onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.authHttpFunction(this.username,this.password);
    }
  }

  ngOnInit() {
    if (localStorage.getItem('id_token')) {
      this.checkRole();
    }
  }
}
//irmusyafa.dev © 2017
