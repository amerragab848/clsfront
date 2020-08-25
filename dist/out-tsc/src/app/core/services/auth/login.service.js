import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    Login(user) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "authenticate", user, {
            headers: headers
        });
    }
};
LoginService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map