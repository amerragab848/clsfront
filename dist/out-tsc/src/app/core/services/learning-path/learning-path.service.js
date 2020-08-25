import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let LearningPathService = class LearningPathService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetLearningPathes() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "LearningPath", {
            headers: headers
        });
    }
    AddLearningPath(learningPath) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "LearningPath", learningPath, {
            headers: headers
        });
    }
    EditLearningPath(learningPath) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "LearningPath", learningPath, {
            headers: headers
        });
    }
    DeleteLearningPath(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "LearningPath/" + id, {
            headers: headers
        });
    }
};
LearningPathService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LearningPathService);
export { LearningPathService };
//# sourceMappingURL=learning-path.service.js.map