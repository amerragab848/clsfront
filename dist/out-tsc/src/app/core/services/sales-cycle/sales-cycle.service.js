import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let SalesCycleService = class SalesCycleService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetSalesCycle() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "SalesCycle", {
            headers: headers
        });
    }
    AddSalesCycle(salesCycle) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "SalesCycle", salesCycle, {
            headers: headers
        });
    }
    EditSalesCycle(salesCycle) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "SalesCycle ", salesCycle, {
            headers: headers
        });
    }
    DeleteSalesCycle(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "SalesCycle/" + id, {
            headers: headers
        });
    }
};
SalesCycleService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], SalesCycleService);
export { SalesCycleService };
//# sourceMappingURL=sales-cycle.service.js.map