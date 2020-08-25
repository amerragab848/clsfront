import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let ClientService = class ClientService {
    constructor(http) {
        this.http = http;
        this.baseURL = environment.baseURL;
    }
    GetClients() {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.get(this.baseURL + "Client", {
            headers: headers
        });
    }
    AddClient(client) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.baseURL + "Client", client, {
            headers: headers
        });
    }
    EditClient(client) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.baseURL + "Client", client, {
            headers: headers
        });
    }
    DeleteClient(id) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.http.delete(this.baseURL + "Client/" + id, {
            headers: headers
        });
    }
};
ClientService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ClientService);
export { ClientService };
//# sourceMappingURL=client.service.js.map