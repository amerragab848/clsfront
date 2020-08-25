import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let SalesCycleComponent = class SalesCycleComponent {
    constructor(_toastSrv, _SalesCycleService, _SalesCycleTypeService) {
        this._toastSrv = _toastSrv;
        this._SalesCycleService = _SalesCycleService;
        this._SalesCycleTypeService = _SalesCycleTypeService;
        this.salesCycle = {
            id: 0
        };
        this.salesCycleType = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetSalesCycles() {
        this._SalesCycleService.GetSalesCycle().subscribe((data) => {
            this.salesCycles = data.result;
            console.log(this.salesCycles);
        });
    }
    GetSalesCycleTypes() {
        this._SalesCycleTypeService.GetSalesCycleType().subscribe((data) => {
            this.salesCycleTypes = data.result;
            console.log(this.salesCycleTypes);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.salesCycle = {
            id: 0
        };
        this.GetSalesCycles();
    }
    SaveSalesCycle() {
        this.salesCycle.percentage = parseInt(this.salesCycle.percentage.toString());
        this.btnClicked = true;
        if (this.salesCycle.id == 0) {
            this._SalesCycleService.AddSalesCycle(this.salesCycle).subscribe((data) => {
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
                this.btnClicked = false;
                console.log(error);
            });
        }
        else {
            this._SalesCycleService.EditSalesCycle(this.salesCycle).subscribe((data) => {
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
    SelectSalesCycleToEdit(salesCycle) {
        this.salesCycle = salesCycle;
    }
    DeleteSalesCycle(id) {
        this._SalesCycleService.DeleteSalesCycle(id).subscribe((data) => {
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
        this.GetSalesCycles();
        this.GetSalesCycleTypes();
    }
};
SalesCycleComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sales-cycle',
        templateUrl: './sales-cycle.component.html',
        styleUrls: ['./sales-cycle.component.css']
    })
], SalesCycleComponent);
export { SalesCycleComponent };
let salesCycleFilterPipe = class salesCycleFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
salesCycleFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'salesCycleFilter'
    })
], salesCycleFilterPipe);
export { salesCycleFilterPipe };
//# sourceMappingURL=sales-cycle.component.js.map