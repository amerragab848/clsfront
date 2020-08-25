import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let LabTypeComponent = class LabTypeComponent {
    constructor(_toastSrv, _labTypeService) {
        this._toastSrv = _toastSrv;
        this._labTypeService = _labTypeService;
        this.labType = {
            id: 0
        };
        this.btnClicked = false;
    }
    ngOnInit() {
        this.GetLabTypes();
    }
    ClearObject() {
        this.labType = {
            id: 0
        };
        this.GetLabTypes();
    }
    SaveLabType() {
        this.btnClicked = true;
        if (this.labType.id == 0) {
            this._labTypeService.AddLabType(this.labType).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetLabTypes();
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
            this._labTypeService.EditLabType(this.labType).subscribe((data) => {
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
    GetLabTypes() {
        this._labTypeService.GetLabTypes().subscribe((data) => {
            this.labTypes = data.result;
        });
    }
    SelectCategoryToEdit(labType) {
        this.labType = labType;
    }
    DeleteType(id) {
        this._labTypeService.DeleteLabType(id).subscribe((data) => {
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
    onChangePage(pageOfItems) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
};
LabTypeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-lab-type',
        templateUrl: './lab-type.component.html',
        styleUrls: ['./lab-type.component.css']
    })
], LabTypeComponent);
export { LabTypeComponent };
// pipe should be registered in app.module
let labTypeFilterPipe = class labTypeFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
labTypeFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'labTypeFilter'
    })
], labTypeFilterPipe);
export { labTypeFilterPipe };
//# sourceMappingURL=lab-type.component.js.map