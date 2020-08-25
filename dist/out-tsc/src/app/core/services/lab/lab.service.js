import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let LabService = class LabService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetLabs() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Lab", {
            headers: headers
        });
    }
    AddLab(lab) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Lab", lab, {
            headers: headers
        });
    }
    EditLab(lab) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Lab", lab, {
            headers: headers
        });
    }
    DeleteLab(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Lab/" + id, {
            headers: headers
        });
    }
};
LabService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LabService);
export { LabService };
//# sourceMappingURL=lab.service.js.map