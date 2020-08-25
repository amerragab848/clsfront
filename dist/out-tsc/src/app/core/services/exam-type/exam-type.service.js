import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let ExamTypeService = class ExamTypeService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetExamTypes() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "ExamType", {
            headers: headers
        });
    }
    AddExamType(examType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "ExamType", examType, {
            headers: headers
        });
    }
    EditExamType(examType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "ExamType", examType, {
            headers: headers
        });
    }
    DeleteExamType(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "ExamType/" + id, {
            headers: headers
        });
    }
};
ExamTypeService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ExamTypeService);
export { ExamTypeService };
//# sourceMappingURL=exam-type.service.js.map