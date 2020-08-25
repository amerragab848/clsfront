import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let InstructorService = class InstructorService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetInstructors() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Instructor", {
            headers: headers
        });
    }
    AddInstructor(instructor) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Instructor", instructor, {
            headers: headers
        });
    }
    EditInstructor(instructor) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Instructor", instructor, {
            headers: headers
        });
    }
    DeleteInstructor(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Instructor/" + id, {
            headers: headers
        });
    }
};
InstructorService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], InstructorService);
export { InstructorService };
//# sourceMappingURL=instructor.service.js.map