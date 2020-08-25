import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let SubCategoryService = class SubCategoryService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetSubCategories() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "CourseSubCategory", {
            headers: headers
        });
    }
    AddSubCategory(subCategory) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "CourseSubCategory", subCategory, {
            headers: headers
        });
    }
    EditSubCategory(subCategory) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "CourseSubCategory", subCategory, {
            headers: headers
        });
    }
    DeleteCourseSubCategory(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "CourseSubCategory/" + id, {
            headers: headers
        });
    }
};
SubCategoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], SubCategoryService);
export { SubCategoryService };
//# sourceMappingURL=sub-category.service.js.map