import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let BranchService = class BranchService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetBranches() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Branch", {
            headers: headers
        });
    }
    AddBranch(branch) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Branch", branch, {
            headers: headers
        });
    }
    EditBranch(branch) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Branch", branch, {
            headers: headers
        });
    }
    DeleteBranch(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Branch/" + id, {
            headers: headers
        });
    }
};
BranchService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], BranchService);
export { BranchService };
//# sourceMappingURL=branch.service.js.map