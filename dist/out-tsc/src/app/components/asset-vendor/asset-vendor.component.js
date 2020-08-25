import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let AssetVendorComponent = class AssetVendorComponent {
    constructor(_toastSrv, _assetVendorService) {
        this._toastSrv = _toastSrv;
        this._assetVendorService = _assetVendorService;
        this.assetVendor = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetAssetVendor() {
        this._assetVendorService.GetAssetVendor().subscribe((data) => {
            this.assetVendors = data.result;
            console.log(this.assetVendors);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.assetVendor = {
            id: 0
        };
        this.GetAssetVendor();
    }
    SaveAssetVendor() {
        this.btnClicked = true;
        if (this.assetVendor.id == 0) {
            this._assetVendorService.AddAssetVendor(this.assetVendor).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetAssetVendor();
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
            this._assetVendorService.EditAssetVendor(this.assetVendor).subscribe((data) => {
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
    DeleteAssetVendor(id) {
        this._assetVendorService.DeleteAssetVendor(id).subscribe((data) => {
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
    SelectAssetVendorToEdit(vendor) {
        this.assetVendor = vendor;
    }
    ngOnInit() {
        this.GetAssetVendor();
    }
};
AssetVendorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-asset-vendor',
        templateUrl: './asset-vendor.component.html',
        styleUrls: ['./asset-vendor.component.css']
    })
], AssetVendorComponent);
export { AssetVendorComponent };
let assetVendorFilterPipe = class assetVendorFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
assetVendorFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'assetVendorFilter'
    })
], assetVendorFilterPipe);
export { assetVendorFilterPipe };
//# sourceMappingURL=asset-vendor.component.js.map