import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
// Imports
let fileUpload = require('fuctbase64');
let VendorComponent = class VendorComponent {
    constructor(_toastSrv, _vendorService, _categoreisService) {
        this._toastSrv = _toastSrv;
        this._vendorService = _vendorService;
        this._categoreisService = _categoreisService;
        this.selectedCategories = [];
        this.vendor = {
            id: 0
        };
        this.btnClicked = false;
        this.fileResult = null;
        this.fileInput = null;
    }
    ngOnInit() {
        this.GetVendors();
        this.GetCategories();
    }
    ClearObject() {
        this.vendor = {
            id: 0
        };
        this.GetVendors();
        this.fileInput = null;
    }
    onFileChange(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield fileUpload(event);
                this.fileResult = result;
            }
            catch (_a) {
                this.fileResult = null;
            }
        });
    }
    SaveVendor() {
        this.btnClicked = true;
        if (this.fileResult != null) {
            this.vendor.base64File = this.fileResult.base64;
            this.vendor.fileName = this.fileResult.name;
        }
        this.vendor.categories = this.selectedCategories.toString();
        if (this.vendor.id == 0) {
            this._vendorService.AddVendor(this.vendor).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetVendors();
                    this.btnClicked = false;
                }
                if (data.code === 500) {
                    this._toastSrv.error("Failed", data.message);
                    this.ClearObject();
                    this.btnClicked = false;
                }
            }, (error) => {
                // if(error.error.code === 500){
                //   this.toastr.error("",error.error.responseException.exceptionMessage);
                //   this.btnClicked=false;
                // }
                this.btnClicked = false;
                console.log(error);
            });
        }
        else {
            this._vendorService.EditVendor(this.vendor).subscribe((data) => {
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
                    // this.toastr.error("",error.error.responseException.exceptionMessage);
                    this.btnClicked = false;
                }
            });
        }
    }
    GetVendors() {
        this._vendorService.GetVendors().subscribe((data) => {
            this.vendors = data.result;
            console.log(this.vendors);
        });
    }
    GetCategories() {
        this._categoreisService.GetCourseCategories().subscribe((data) => {
            this.categories = data.result;
        });
    }
    SelectVendorToEdit(vendor) {
        try {
            var arr = vendor.categories.toString().split(',');
            var tempArr = [];
            arr.forEach(element => {
                tempArr.push(parseInt(element));
            });
            // this.selectedCategories =  [parseInt('1'),parseInt('2')];
            this.selectedCategories = tempArr;
        }
        catch (_a) {
            //Ignore
        }
        this.vendor = vendor;
    }
    onChangePage(pageOfItems) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
    SelectCategory() {
        console.log(this.selectedCategories);
    }
};
VendorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-vendor',
        templateUrl: './vendor.component.html',
        styleUrls: ['./vendor.component.css']
    })
], VendorComponent);
export { VendorComponent };
// pipe should be registered in app.module
let vendorFilterPipe = class vendorFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
vendorFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'vendorFilter'
    })
], vendorFilterPipe);
export { vendorFilterPipe };
//# sourceMappingURL=vendor.component.js.map