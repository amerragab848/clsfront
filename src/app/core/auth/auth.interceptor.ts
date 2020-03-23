import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (localStorage.getItem("auth-token") != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('auth-token'))
            });

            return next.handle(clonedreq).pipe(tap(() => { },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        this.router.navigate(['/auth']);
                    }
                }));
        }
        else{
            this.router.navigate(['/auth']);
        }
    }
}
