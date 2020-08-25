import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let AssetVendorService = class AssetVendorService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetAssetVendor() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "AssetVendor", {
            headers: headers
        });
    }
    AddAssetVendor(assetVendor) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "AssetVendor", assetVendor, {
            headers: headers
        });
    }
    EditAssetVendor(assetVendor) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "AssetVendor", assetVendor, {
            headers: headers
        });
    }
    DeleteAssetVendor(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "AssetVendor/" + id, {
            headers: headers
        });
    }
};
AssetVendorService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AssetVendorService);
export { AssetVendorService };
//# sourceMappingURL=asset-vendor.service.js.map