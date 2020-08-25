import * as tslib_1 from "tslib";
import { HttpErrorResponse } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
let AuthInterceptor = class AuthInterceptor {
    constructor(router) {
        this.router = router;
    }
    intercept(req, next) {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());
        if (localStorage.getItem("auth-token") != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('auth-token'))
            });
            return next.handle(clonedreq).pipe(tap(() => { }, (err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.router.navigate(['/auth']);
                }
            }));
        }
        else {
            this.router.navigate(['/auth']);
        }
    }
};
AuthInterceptor = tslib_1.__decorate([
    Injectable()
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map