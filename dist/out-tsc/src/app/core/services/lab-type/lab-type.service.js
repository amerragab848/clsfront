import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let LabTypeService = class LabTypeService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetLabTypes() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "LabType", {
            headers: headers
        });
    }
    AddLabType(labType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "LabType", labType, {
            headers: headers
        });
    }
    EditLabType(labType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "LabType", labType, {
            headers: headers
        });
    }
    DeleteLabType(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "LabType/" + id, {
            headers: headers
        });
    }
};
LabTypeService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LabTypeService);
export { LabTypeService };
//# sourceMappingURL=lab-type.service.js.map