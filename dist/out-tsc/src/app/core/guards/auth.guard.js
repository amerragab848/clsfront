import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate(next, state) {
        if (localStorage.getItem("auth-token") != null) {
            return true;
        }
        else {
            this.router.navigate(["/auth"]);
            return false;
        }
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map