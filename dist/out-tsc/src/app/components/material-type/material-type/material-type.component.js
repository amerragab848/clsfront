import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let MaterialTypeComponent = class MaterialTypeComponent {
    constructor(_toastSrv, _materialTypeService) {
        this._toastSrv = _toastSrv;
        this._materialTypeService = _materialTypeService;
        this.materialType = {
            id: 0
        };
        this.btnClicked = false;
    }
    ngOnInit() {
        this.GetMaterialTypes();
    }
    ClearObject() {
        this.materialType = {
            id: 0
        };
        this.GetMaterialTypes();
    }
    SaveMaterialType() {
        this.btnClicked = true;
        if (this.materialType.id == 0) {
            this._materialTypeService.AddMaterialType(this.materialType).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetMaterialTypes();
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
            this._materialTypeService.EditMaterialType(this.materialType).subscribe((data) => {
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
    DeleteType(id) {
        this._materialTypeService.DeleteMaterialType(id).subscribe((data) => {
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
    GetMaterialTypes() {
        this._materialTypeService.GetMaterialTypes().subscribe((data) => {
            this.materialTypes = data.result;
        });
    }
    SelectCategoryToEdit(materialType) {
        this.materialType = materialType;
    }
    onChangePage(pageOfItems) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
};
MaterialTypeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-material-type',
        templateUrl: './material-type.component.html',
        styleUrls: ['./material-type.component.css']
    })
], MaterialTypeComponent);
export { MaterialTypeComponent };
// pipe should be registered in app.module
let materialTypeFilterPipe = class materialTypeFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
materialTypeFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'materialTypeFilter'
    })
], materialTypeFilterPipe);
export { materialTypeFilterPipe };
//# sourceMappingURL=material-type.component.js.map