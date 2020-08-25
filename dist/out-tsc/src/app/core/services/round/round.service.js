import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let RoundService = class RoundService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetCourseRounds(coursrId) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Round/course/" + coursrId + "/rounds", {
            headers: headers
        });
    }
    GetRoundDetails(roundId) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Round/" + roundId + "/details", {
            headers: headers
        });
    }
    GetRoundById(roundId) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Round/" + roundId + "", {
            headers: headers
        });
    }
    GetRoundSessions(roundId) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Round/" + roundId + "/sessions", {
            headers: headers
        });
    }
    GetRoundsTimeTable(labId, courseId, startDate, endDate) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Round/" + labId + "/" + courseId + "/" + startDate + "/" + endDate + "/timetable", {
            headers: headers
        });
    }
    GetRoundEndDate(startDate, weeks) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Round/round/enddate/" + startDate + "/" + weeks, {
            headers: headers
        });
    }
    SaveRound(round) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Round/", round, {
            headers: headers
        });
    }
    ExecuteRound(roundId) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Round/" + roundId + "/execute", {
            headers: headers
        });
    }
    DeleteRound(roundId) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Round/" + roundId, {
            headers: headers
        });
    }
};
RoundService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], RoundService);
export { RoundService };
//# sourceMappingURL=round.service.js.map