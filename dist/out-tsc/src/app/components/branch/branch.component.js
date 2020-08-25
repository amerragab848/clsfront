import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let BranchComponent = class BranchComponent {
    constructor(_toastSrv, _branchService) {
        this._toastSrv = _toastSrv;
        this._branchService = _branchService;
        this.branch = {
            id: 0
        };
        this.btnClicked = false;
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
        this.branch = {
            id: 0
        };
        this.GetBranches();
    }
    SaveBranch() {
        this.btnClicked = true;
        if (this.branch.id == 0) {
            this._branchService.AddBranch(this.branch).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetBranches();
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
            this._branchService.EditBranch(this.branch).subscribe((data) => {
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
    SelectBranchToEdit(branch) {
        this.branch = branch;
    }
    DeleteBranch(id) {
        this._branchService.DeleteBranch(id).subscribe((data) => {
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
        this.GetBranches();
    }
};
BranchComponent = tslib_1.__decorate([
    Component({
        selector: 'app-branch',
        templateUrl: './branch.component.html',
        styleUrls: ['./branch.component.css']
    })
], BranchComponent);
export { BranchComponent };
let branchFilterPipe = class branchFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
branchFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'branchFilter'
    })
], branchFilterPipe);
export { branchFilterPipe };
//# sourceMappingURL=branch.component.js.map