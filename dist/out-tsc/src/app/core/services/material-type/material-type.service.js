import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let MaterialTypeService = class MaterialTypeService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetMaterialTypes() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "MaterialType", {
            headers: headers
        });
    }
    AddMaterialType(materialType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "MaterialType", materialType, {
            headers: headers
        });
    }
    EditMaterialType(materialType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "MaterialType", materialType, {
            headers: headers
        });
    }
    DeleteMaterialType(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "MaterialType/" + id, {
            headers: headers
        });
    }
};
MaterialTypeService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], MaterialTypeService);
export { MaterialTypeService };
//# sourceMappingURL=material-type.service.js.map