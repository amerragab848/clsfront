import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let AssetGroupService = class AssetGroupService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetAssetGroup() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "AssetGroup", {
            headers: headers
        });
    }
    GetAssetGroupById(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "AssetGroup/" + id, {
            headers: headers
        });
    }
    AddAssetGroup(assetGroup) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "AssetGroup", assetGroup, {
            headers: headers
        });
    }
    EditAssetGroup(assetGroup) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "AssetGroup", assetGroup, {
            headers: headers
        });
    }
    DeleteAssetGroup(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "AssetGroup/" + id, {
            headers: headers
        });
    }
};
AssetGroupService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AssetGroupService);
export { AssetGroupService };
//# sourceMappingURL=asset-group.service.js.map