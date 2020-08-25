import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let CourseTypeService = class CourseTypeService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetCourseTypes() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "CourseType", {
            headers: headers
        });
    }
    AddCourseType(courseType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "CourseType", courseType, {
            headers: headers
        });
    }
    EditCourseType(courseType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "CourseType", courseType, {
            headers: headers
        });
    }
    DeleteCourseType(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "CourseType/" + id, {
            headers: headers
        });
    }
};
CourseTypeService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CourseTypeService);
export { CourseTypeService };
//# sourceMappingURL=course-type.service.js.map