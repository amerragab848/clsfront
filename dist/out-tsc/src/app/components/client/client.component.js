import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let ClientComponent = class ClientComponent {
    constructor(_toastSrv, _clientService) {
        this._toastSrv = _toastSrv;
        this._clientService = _clientService;
        this.client = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetClients() {
        this._clientService.GetClients().subscribe((data) => {
            this.clients = data.result;
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.client = {
            id: 0
        };
        this.GetClients();
    }
    SaveClient() {
        this.btnClicked = true;
        if (this.client.id == 0) {
            this._clientService.AddClient(this.client).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetClients();
                    this.btnClicked = false;
                }
                if (data.code === 500) {
                    this._toastSrv.error("Failed", data.message);
                    this.ClearObject();
                    this.btnClicked = false;
                }
            }, (error) => {
                this.btnClicked = false;
                console.log(error);
            });
        }
        else {
            this._clientService.EditClient(this.client).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.btnClicked = false;
                }
                if (data.code === 500) {
                    this._toastSrv.error("Failed", data.message);
                    this.ClearObject();
                    this.btnClicked = false;
                }
            }, (error) => {
                if (error.error.code === 500) {
                    this.btnClicked = false;
                }
            });
        }
    }
    SelectClientToEdit(client) {
        this.client = client;
    }
    DeleteClient(id) {
        this._clientService.DeleteClient(id).subscribe((data) => {
            if (data.code === 200) {
                this._toastSrv.success("Success", "");
                this.ClearObject();
            }
            if (data.code === 500) {
                this._toastSrv.error("Failed", data.message);
            }
        }, (error) => {
            this._toastSrv.error("Failed", "You can not delete this record");
        });
    }
    ngOnInit() {
        this.GetClients();
    }
};
ClientComponent = tslib_1.__decorate([
    Component({
        selector: 'app-client',
        templateUrl: './client.component.html',
        styleUrls: ['./client.component.css']
    })
], ClientComponent);
export { ClientComponent };
let clientFilterPipe = class clientFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.nameEN.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
clientFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'clientFilter'
    })
], clientFilterPipe);
export { clientFilterPipe };
//# sourceMappingURL=client.component.js.map