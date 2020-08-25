import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let FacilityService = class FacilityService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetFacilities() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Facility", {
            headers: headers
        });
    }
    AddFacility(facility) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Facility", facility, {
            headers: headers
        });
    }
    EditFacility(facility) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Facility", facility, {
            headers: headers
        });
    }
    DeleteFacility(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Facility/" + id, {
            headers: headers
        });
    }
};
FacilityService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], FacilityService);
export { FacilityService };
//# sourceMappingURL=facility.service.js.map