import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
let ToastService = class ToastService {
    constructor() {
        this.swal = Swal;
    }
    success(title, text) {
        this.swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
    error(title, text) {
        this.swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    warning(title, text) {
        this.swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
};
ToastService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ToastService);
export { ToastService };
//# sourceMappingURL=toast.service.js.map