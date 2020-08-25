import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let SalesCycleTypeComponent = class SalesCycleTypeComponent {
    constructor(_toastSrv, _salesCycleTypeService) {
        this._toastSrv = _toastSrv;
        this._salesCycleTypeService = _salesCycleTypeService;
        this.salesCycleType = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetSalesCycleTypes() {
        this._salesCycleTypeService.GetSalesCycleType().subscribe((data) => {
            this.salesCycleTypes = data.result;
            console.log(this.salesCycleTypes);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.salesCycleType = {
            id: 0
        };
        this.GetSalesCycleTypes();
    }
    SaveSalesCycleType() {
        this.btnClicked = true;
        if (this.salesCycleType.id == 0) {
            this._salesCycleTypeService.AddSalesCycleType(this.salesCycleType).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetSalesCycleTypes();
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
            this._salesCycleTypeService.EditSalesCycleType(this.salesCycleType).subscribe((data) => {
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
    DeleteSalesCycleType(id) {
        this._salesCycleTypeService.DeleteSalesCycleType(id).subscribe((data) => {
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
    SelectSalesCycleTypeToEdit(salesCycleType) {
        this.salesCycleType = salesCycleType;
    }
    ngOnInit() {
        this.GetSalesCycleTypes();
    }
};
SalesCycleTypeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sales-cycle-type',
        templateUrl: './sales-cycle-type.component.html',
        styleUrls: ['./sales-cycle-type.component.css']
    })
], SalesCycleTypeComponent);
export { SalesCycleTypeComponent };
let salesCycleTypeFilterPipe = class salesCycleTypeFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
salesCycleTypeFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'salesCycleTypeFilter'
    })
], salesCycleTypeFilterPipe);
export { salesCycleTypeFilterPipe };
//# sourceMappingURL=sales-cycle-type.component.js.map