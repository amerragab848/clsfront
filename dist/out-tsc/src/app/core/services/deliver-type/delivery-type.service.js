import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let DeliveryTypeService = class DeliveryTypeService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetDeliveryTypes() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "DeliveryType", {
            headers: headers
        });
    }
    AddDeliveryType(deliveryType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "DeliveryType", deliveryType, {
            headers: headers
        });
    }
    EditDeliveryType(deliveryType) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "DeliveryType", deliveryType, {
            headers: headers
        });
    }
    DeleteDeliveryType(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "DeliveryType/" + id, {
            headers: headers
        });
    }
};
DeliveryTypeService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], DeliveryTypeService);
export { DeliveryTypeService };
//# sourceMappingURL=delivery-type.service.js.map