import * as tslib_1 from "tslib";
import { Component, TemplateRef } from '@angular/core';
let ToastComponent = class ToastComponent {
    constructor(toastService) {
        this.toastService = toastService;
    }
    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
    ngOnInit() {
    }
};
ToastComponent = tslib_1.__decorate([
    Component({
        selector: 'app-toasts',
        templateUrl: './toast.component.html',
        host: { '[class.ngb-toasts]': 'true' }
    })
], ToastComponent);
export { ToastComponent };
//# sourceMappingURL=toast.component.js.map