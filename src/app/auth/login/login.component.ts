import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
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
  public urlLogin = 'http://yippytech.com:5000/api/auth';

  constructor(private router: Router, fb:FormBuilder, private http: Http, private toastr: ToastrService,) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  private authHttpFunction(username, password) {
    let creds = JSON.stringify({ username: username.value, password: password.value });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'login_type': '1'
    });
    this.http.post(this.urlLogin, creds, {
      headers: headers
      })
      .map(res => res.json())
      .subscribe(data => {
        this.showError(data.message);
        this.showError(data.success);
        if(data.success === true){
          localStorage.setItem('token', data.token);
          this.decode = this.jwtHelper.decodeToken(data.token);
          this.role = this.decode.role;
          this.checkRole();
        }
      })
  }

  private showError(message) {
    console.log(message);
    // this.toastr.error(message,'Eror');
  }

  private checkRole(){
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
    this.showError('test');
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      this.role = this.decode.role;
      this.checkRole()
    }
  }
}
//irmusyafa.dev © 2017
