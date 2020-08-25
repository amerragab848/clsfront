import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let CourseOutlineService = class CourseOutlineService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetCourseOutlines() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "CourseOtline", {
            headers: headers
        });
    }
    AddCourseOutline(courseOutline) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "CourseOtline", courseOutline, {
            headers: headers
        });
    }
    EditCourseOutline(courseOutline) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "CourseOtline", courseOutline, {
            headers: headers
        });
    }
    DeleteCourseOtline(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "CourseOtline/" + id, {
            headers: headers
        });
    }
};
CourseOutlineService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CourseOutlineService);
export { CourseOutlineService };
//# sourceMappingURL=course-outline.service.js.map