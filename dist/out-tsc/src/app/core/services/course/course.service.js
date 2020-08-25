import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let CourseService = class CourseService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetCoursees() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Course", {
            headers: headers
        });
    }
    AddCourse(course) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Course", course, {
            headers: headers
        });
    }
    EditCourse(course) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Course", course, {
            headers: headers
        });
    }
    DeleteCourse(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Course/" + id, {
            headers: headers
        });
    }
};
CourseService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CourseService);
export { CourseService };
//# sourceMappingURL=course.service.js.map