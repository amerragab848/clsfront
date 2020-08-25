import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let ExamTypeComponent = class ExamTypeComponent {
    constructor(_toastSrv, _examTypeService) {
        this._toastSrv = _toastSrv;
        this._examTypeService = _examTypeService;
        this.examType = {
            id: 0
        };
        this.btnClicked = false;
    }
    ngOnInit() {
        this.GetExamTypes();
    }
    ClearObject() {
        this.examType = {
            id: 0
        };
        this.GetExamTypes();
    }
    SaveExamType() {
        this.btnClicked = true;
        if (this.examType.id == 0) {
            this._examTypeService.AddExamType(this.examType).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetExamTypes();
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
            this._examTypeService.EditExamType(this.examType).subscribe((data) => {
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
    GetExamTypes() {
        this._examTypeService.GetExamTypes().subscribe((data) => {
            this.examTypes = data.result;
        });
    }
    DeleteType(id) {
        this._examTypeService.DeleteExamType(id).subscribe((data) => {
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
    SelectCategoryToEdit(examType) {
        this.examType = examType;
    }
    onChangePage(pageOfItems) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
};
ExamTypeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-exam-type',
        templateUrl: './exam-type.component.html',
        styleUrls: ['./exam-type.component.css']
    })
], ExamTypeComponent);
export { ExamTypeComponent };
// pipe should be registered in app.module
let examTypeFilterPipe = class examTypeFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
examTypeFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'examTypeFilter'
    })
], examTypeFilterPipe);
export { examTypeFilterPipe };
//# sourceMappingURL=exam-type.component.js.map