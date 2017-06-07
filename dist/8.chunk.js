webpackJsonpac__name_([8],{

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_component__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_routing__ = __webpack_require__(752);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });






var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__["a" /* NgaModule */],
                __WEBPACK_IMPORTED_MODULE_5__login_routing__["a" /* routing */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* Login */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());


/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_toastr_ng2__ = __webpack_require__(197);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });






var Login = (function () {
    function Login(router, fb, http, toastr) {
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.progress = false;
        this.submitted = false;
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["JwtHelper"]();
        this.urlLogin = 'https://ph.yippytech.com:5000/user/auth';
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]({
            'Content-Type': 'application/json'
        });
        this.form = fb.group({
            'username': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(4)])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(4)])]
        });
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }
    Login.prototype.authHttpFunction = function (username, password) {
        var _this = this;
        var creds = JSON.stringify({ username: username.value, password: password.value, login_type: 0 });
        this.http.post(this.urlLogin, creds, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.success === true) {
                localStorage.setItem('id_token', data.token);
                _this.checkRole();
            }
            else {
                _this.showMessageError('Sign in Failed');
            }
            _this.progress = false;
        }, function (err) {
            _this.showMessageError(err.message);
            _this.progress = false;
        });
    };
    Login.prototype.showMessageSuccess = function (message) {
        this.toastr.success(message, 'Success!');
    };
    Login.prototype.showMessageError = function (message) {
        this.toastr.error(message, 'Error!');
    };
    Login.prototype.checkRole = function () {
        //decode token form localStorage('id_token')
        this.decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
        this.role = this.decode.role;
        //checking role admin / pemerintah
        if (this.role === 1) {
            this.router.navigate(['/admin']);
            this.showMessageSuccess("Selamat datang di Portal Harga");
        }
        else if (this.role === 2) {
            this.router.navigate(['/gov']);
            this.showMessageSuccess("Selamat datang di Portal Harga");
        }
        else {
            this.showMessageError("Anda tidak memilik akses");
        }
    };
    Login.prototype.onSubmit = function (values) {
        this.progress = true;
        this.submitted = true;
        if (this.form.valid) {
            this.authHttpFunction(this.username, this.password);
        }
    };
    Login.prototype.ngOnInit = function () {
        if (localStorage.getItem('id_token')) {
            this.checkRole();
        }
    };
    Login = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login',
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            styles: [__webpack_require__(781)],
            template: __webpack_require__(800),
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5_toastr_ng2__["b" /* ToastrService */]])
    ], Login);
    return Login;
}());
//irmusyafa.dev © 2017


/***/ }),

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_component__ = __webpack_require__(713);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });


// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__login_component__["a" /* Login */]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(routes);


/***/ }),

/***/ 781:
/***/ (function(module, exports) {

module.exports = ".auth-main {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  background-color: #aee06d;\n  background-size: cover; }\n\n.form-control {\n  color: black; }\n\n.form-control:empty {\n  background-color: #white; }\n\n.auth-block {\n  width: 320px;\n  border-radius: 5px;\n  background: rgba(255, 255, 255, 0.55);\n  color: #fff;\n  padding: 32px; }\n  .auth-block h1 {\n    font-weight: 300; }\n  .auth-block p {\n    font-weight: 300;\n    color: black;\n    font-size: 12px; }\n  .auth-block a {\n    text-decoration: none;\n    outline: none;\n    transition: all 0.2s ease;\n    color: #8bd22f; }\n    .auth-block a:hover {\n      color: #76b328; }\n  .auth-block .control-label {\n    padding-top: 11px;\n    color: black; }\n  .auth-block .form-group {\n    margin-bottom: 12px; }\n\n.auth-input {\n  width: 300px;\n  margin-bottom: 24px; }\n  .auth-input input {\n    display: block;\n    width: 100%;\n    border: none;\n    font-size: 16px;\n    padding: 4px 10px;\n    outline: none; }\n\n.btn {\n  font-weight: 300; }\n\na.forgot-pass {\n  display: block;\n  text-align: right;\n  margin-bottom: -20px;\n  float: right;\n  z-index: 2;\n  position: relative; }\n\n.auth-link {\n  display: block;\n  font-size: 16px;\n  text-align: center;\n  margin-bottom: 33px; }\n\n.auth-sep {\n  margin-top: 36px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  font-size: 16px;\n  text-align: center;\n  display: block;\n  position: relative; }\n  .auth-sep > span {\n    display: table-cell;\n    width: 30%;\n    white-space: nowrap;\n    padding: 0 24px;\n    color: #ffffff; }\n    .auth-sep > span > span {\n      margin-top: -12px;\n      display: block; }\n  .auth-sep:before, .auth-sep:after {\n    border-top: solid 1px #ffffff;\n    content: \"\";\n    height: 1px;\n    width: 35%;\n    display: table-cell; }\n\n.al-share-auth {\n  text-align: center; }\n  .al-share-auth .al-share {\n    float: none;\n    margin: 0;\n    padding: 0;\n    display: inline-block; }\n    .al-share-auth .al-share li {\n      margin-left: 24px; }\n      .al-share-auth .al-share li:first-child {\n        margin-left: 0; }\n      .al-share-auth .al-share li i {\n        font-size: 24px; }\n\n.btn-auth {\n  color: #ffffff !important; }\n"

/***/ }),

/***/ 800:
/***/ (function(module, exports) {

module.exports = "<div class=\"auth-main\">\n  <div class=\"auth-block\">\n    <div class=\"row\">\n      <div class=\"col col-md-3\">\n        \n      </div>\n      <div class=\"col col-md-9\">\n        <h1>Portal Harga</h1>\n        <p>&nbsp;Pemerintah & Admin </p>\n      </div>\n    </div>\n    <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(form.value)\" class=\"form-horizontal\">\n\n      <div class=\"form-group row\" [ngClass]=\"{'has-error': (!username.valid && username.touched), 'has-success': (username.valid && username.touched)}\">\n        <label class=\" control-label\">Username</label>\n        <input [formControl]=\"username\" class=\"form-control\" placeholder=\"Username\">\n      </div>\n\n      <div class=\"form-group row\" [ngClass]=\"{'has-error': (!password.valid && password.touched), 'has-success': (password.valid && password.touched)}\">\n        <label class=\" control-label\">Password</label>\n        <input [formControl]=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n      </div>\n\n      <div class=\"form-group row\">\n          <button [disabled]=\"!form.valid\" type=\"submit\" class=\"btn btn-success btn-block btn-raised btn-lg\"><i class=\"fa fa-spinner fa-spin\" [hidden]=\"!progress\" aria-hidden=\"true\"></i> Sign in</button>\n          <!-- <a routerLink=\"/login\" class=\"forgot-pass\">Forgot password?</a> -->\n      </div>\n\n      <hr>\n      <p align=\"center\"> Portal Harga © 2017</p>\n    </form>\n  </div>\n</div>"

/***/ })

});
//# sourceMappingURL=8.chunk.js.map