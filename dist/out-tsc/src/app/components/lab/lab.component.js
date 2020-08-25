import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let LabComponent = class LabComponent {
    constructor(_toastSrv, _labService, _branchService) {
        this._toastSrv = _toastSrv;
        this._labService = _labService;
        this._branchService = _branchService;
        this.lab = {
            id: 0
        };
        this.branch = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetLabs() {
        this._labService.GetLabs().subscribe((data) => {
            this.labs = data.result;
        });
    }
    GetBranches() {
        this._branchService.GetBranches().subscribe((data) => {
            this.branches = data.result;
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.lab = {
            id: 0
        };
        this.GetLabs();
    }
    SaveLab() {
        this.btnClicked = true;
        if (this.lab.id == 0) {
            this._labService.AddLab(this.lab).subscribe((data) => {
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
            this._labService.EditLab(this.lab).subscribe((data) => {
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
    SelectLabToEdit(lab) {
        this.lab = lab;
    }
    DeleteLab(id) {
        this._labService.DeleteLab(id).subscribe((data) => {
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
        this.GetLabs();
        this.GetBranches();
    }
};
LabComponent = tslib_1.__decorate([
    Component({
        selector: 'app-lab',
        templateUrl: './lab.component.html',
        styleUrls: ['./lab.component.css']
    })
], LabComponent);
export { LabComponent };
let labFilterPipe = class labFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.branchName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
labFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'labFilter'
    })
], labFilterPipe);
export { labFilterPipe };
//# sourceMappingURL=lab.component.js.map