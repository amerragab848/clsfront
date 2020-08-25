import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
let LoginComponent = class LoginComponent {
    constructor(srv, router, http) {
        this.srv = srv;
        this.router = router;
        this.http = http;
        this.user = {};
    }
    ngOnInit() {
        this.baseURL = environment.baseURL;
    }
    Login() {
        // this.srv.Login(this.user).subscribe((data : any) =>{
        //   this.srv.Login(this.user).subscribe((data : any)=>{
        //     alert(data);
        //   });
        //   localStorage.setItem("auth-token",data.token);
        //   this.router.navigate(['/app']);
        // });
        if (this.user.username == "dr.fatma" && this.user.password == "Cls@123") {
            localStorage.setItem("auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkci5mYXRtYSIsImp0aSI6ImUyNzBhZjE5LTI5YTgtNGZiMy04YTJlLTQyNDVhMjA5ZTMyMSIsImV4cCI6MTU5NDU4NTY1MSwiaXNzIjoiaHR0cDovL2RvdG5ldGRldGFpbC5uZXQiLCJhdWQiOiJodHRwOi8vZG90bmV0ZGV0YWlsLm5ldCJ9.1Kp3hcU-WdNlBcUCej346dx_hUJddzdVZuBfk6XFnPg");
            this.router.navigate(['/app']);
        }
        else {
            alert("Invalid Username or Password");
        }
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map