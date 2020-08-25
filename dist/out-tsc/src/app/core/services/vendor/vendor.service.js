import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let VendorService = class VendorService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetVendors() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Vendor", {
            headers: headers
        });
    }
    AddVendor(vendor) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Vendor", vendor, {
            headers: headers
        });
    }
    EditVendor(vendor) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Vendor", vendor, {
            headers: headers
        });
    }
    DeleteVendor(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Vendor/" + id, {
            headers: headers
        });
    }
};
VendorService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], VendorService);
export { VendorService };
//# sourceMappingURL=vendor.service.js.map