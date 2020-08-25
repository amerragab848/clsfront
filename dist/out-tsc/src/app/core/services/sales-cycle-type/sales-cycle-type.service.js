import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let SalesCycleTypeService = class SalesCycleTypeService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetSalesCycleType() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "SalesCycleType", {
            headers: headers
        });
    }
    AddSalesCycleType(salesCycleType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "SalesCycleType", salesCycleType, {
            headers: headers
        });
    }
    EditSalesCycleType(salesCycleType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "SalesCycleType", salesCycleType, {
            headers: headers
        });
    }
    DeleteSalesCycleType(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "SalesCycleType/" + id, {
            headers: headers
        });
    }
};
SalesCycleTypeService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], SalesCycleTypeService);
export { SalesCycleTypeService };
//# sourceMappingURL=sales-cycle-type.service.js.map