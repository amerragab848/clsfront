import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let DeliveryTypeComponent = class DeliveryTypeComponent {
    constructor(_toastSrv, _deliveryTypeService) {
        this._toastSrv = _toastSrv;
        this._deliveryTypeService = _deliveryTypeService;
        this.deliveryType = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetDeliveryTypes() {
        this._deliveryTypeService.GetDeliveryTypes().subscribe((data) => {
            this.deliveryTypes = data.result;
            console.log(this.deliveryType);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.deliveryType = {
            id: 0
        };
        this.GetDeliveryTypes();
    }
    SaveDeliveryType() {
        this.btnClicked = true;
        if (this.deliveryType.id == 0) {
            this._deliveryTypeService.AddDeliveryType(this.deliveryType).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetDeliveryTypes();
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
            this._deliveryTypeService.EditDeliveryType(this.deliveryType).subscribe((data) => {
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
    DeleteType(id) {
        this._deliveryTypeService.DeleteDeliveryType(id).subscribe((data) => {
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
    SelectTypeToEdit(deliveryType) {
        this.deliveryType = deliveryType;
    }
    ngOnInit() {
        this.GetDeliveryTypes();
    }
};
DeliveryTypeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-delivery-type',
        templateUrl: './delivery-type.component.html',
        styleUrls: ['./delivery-type.component.css']
    })
], DeliveryTypeComponent);
export { DeliveryTypeComponent };
let deliveryTypeFilterPipe = class deliveryTypeFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
deliveryTypeFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'deliveryTypeFilter'
    })
], deliveryTypeFilterPipe);
export { deliveryTypeFilterPipe };
//# sourceMappingURL=delivery-type.component.js.map