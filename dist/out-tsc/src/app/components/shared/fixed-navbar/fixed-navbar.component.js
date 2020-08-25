import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FixedNavbarComponent = class FixedNavbarComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    Logout() {
        localStorage.removeItem("auth-token");
        this.router.navigate(['/auth']);
    }
};
FixedNavbarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-fixed-navbar',
        templateUrl: './fixed-navbar.component.html',
        styleUrls: ['./fixed-navbar.component.css']
    })
], FixedNavbarComponent);
export { FixedNavbarComponent };
//# sourceMappingURL=fixed-navbar.component.js.map