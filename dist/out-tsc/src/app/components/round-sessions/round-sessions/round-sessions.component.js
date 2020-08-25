import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let RoundSessionsComponent = class RoundSessionsComponent {
    constructor(_roundSrv, router) {
        this._roundSrv = _roundSrv;
        this.router = router;
    }
    ngOnInit() {
        this.GetRoundSessions();
    }
    GetRoundSessions() {
        this._roundSrv.GetRoundSessions(this.router.snapshot.params.id).subscribe((data) => {
            this.sessions = data.result;
        });
    }
};
RoundSessionsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-round-sessions',
        templateUrl: './round-sessions.component.html',
        styleUrls: ['./round-sessions.component.css']
    })
], RoundSessionsComponent);
export { RoundSessionsComponent };
//# sourceMappingURL=round-sessions.component.js.map