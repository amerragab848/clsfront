import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let CorporateService = class CorporateService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetCorporates() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Corporate", {
            headers: headers
        });
    }
    AddCorporate(corporate) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Corporate", corporate, {
            headers: headers
        });
    }
    EditCorporate(corporate) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Corporate", corporate, {
            headers: headers
        });
    }
    DeleteCorporate(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Corporate/" + id, {
            headers: headers
        });
    }
};
CorporateService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CorporateService);
export { CorporateService };
//# sourceMappingURL=corporate.service.js.map