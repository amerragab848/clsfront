import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let AssetService = class AssetService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetAsset() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "AssetItem", {
            headers: headers
        });
    }
    GetAssetById(assetId) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "AssetItem/" + assetId, {
            headers: headers
        });
    }
    AddAsset(asset) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "AssetItem", asset, {
            headers: headers
        });
    }
    EditAsset(asset) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "AssetItem", asset, {
            headers: headers
        });
    }
    DeleteAsset(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "AssetItem/" + id, {
            headers: headers
        });
    }
};
AssetService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AssetService);
export { AssetService };
//# sourceMappingURL=asset.service.js.map