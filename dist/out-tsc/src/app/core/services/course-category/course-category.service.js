import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let CourseCategoryService = class CourseCategoryService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetCourseCategories() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "CourseCategory", {
            headers: headers
        });
    }
    AddCourseCategory(courseCategory) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "CourseCategory", courseCategory, {
            headers: headers
        });
    }
    EditCourseCategory(courseCategory) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "CourseCategory", courseCategory, {
            headers: headers
        });
    }
    DeleteCategory(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "CourseCategory/" + id, {
            headers: headers
        });
    }
};
CourseCategoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CourseCategoryService);
export { CourseCategoryService };
//# sourceMappingURL=course-category.service.js.map