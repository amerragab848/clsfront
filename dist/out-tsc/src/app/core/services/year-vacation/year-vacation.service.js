import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let YearVacationService = class YearVacationService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetVacation() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "YearVacation", {
            headers: headers
        });
    }
    AddVacation(vacation) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "YearVacation", vacation, {
            headers: headers
        });
    }
    EditVacation(vacation) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "YearVacation", vacation, {
            headers: headers
        });
    }
    DeleteVacation(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "YearVacation/" + id, {
            headers: headers
        });
    }
};
YearVacationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], YearVacationService);
export { YearVacationService };
//# sourceMappingURL=year-vacation.service.js.map