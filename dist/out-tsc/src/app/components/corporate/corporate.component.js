import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let CorporateComponent = class CorporateComponent {
    constructor(_toastSrv, _corporateService) {
        this._toastSrv = _toastSrv;
        this._corporateService = _corporateService;
        this.corporate = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetCorporates() {
        this._corporateService.GetCorporates().subscribe((data) => {
            this.corporates = data.result;
            console.log(this.corporates);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.corporate = {
            id: 0
        };
        this.GetCorporates();
    }
    SaveCorporate() {
        this.btnClicked = true;
        if (this.corporate.id == 0) {
            this._corporateService.AddCorporate(this.corporate).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetCorporates();
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
            this._corporateService.EditCorporate(this.corporate).subscribe((data) => {
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
    SelectCorporateToEdit(corporate) {
        this.corporate = corporate;
    }
    DeleteCorporaet(id) {
        this._corporateService.DeleteCorporate(id).subscribe((data) => {
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
        this.GetCorporates();
    }
};
CorporateComponent = tslib_1.__decorate([
    Component({
        selector: 'app-corporate',
        templateUrl: './corporate.component.html',
        styleUrls: ['./corporate.component.css']
    })
], CorporateComponent);
export { CorporateComponent };
let corporateFilterPipe = class corporateFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
corporateFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'corporateFilter'
    })
], corporateFilterPipe);
export { corporateFilterPipe };
//# sourceMappingURL=corporate.component.js.map