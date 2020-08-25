import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let CourseTypeComponent = class CourseTypeComponent {
    constructor(_toastSrv, _courseTypeService) {
        this._toastSrv = _toastSrv;
        this._courseTypeService = _courseTypeService;
        this.courseType = {
            id: 0
        };
        this.btnClicked = false;
    }
    ngOnInit() {
        this.GetCourseTypes();
    }
    ClearObject() {
        this.courseType = {
            id: 0
        };
        this.GetCourseTypes();
    }
    DeleteType(id) {
        this._courseTypeService.DeleteCourseType(id).subscribe((data) => {
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
    SaveCourseType() {
        this.btnClicked = true;
        if (this.courseType.id == 0) {
            this._courseTypeService.AddCourseType(this.courseType).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetCourseTypes();
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
            this._courseTypeService.EditCourseType(this.courseType).subscribe((data) => {
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
    GetCourseTypes() {
        this._courseTypeService.GetCourseTypes().subscribe((data) => {
            this.courseTypes = data.result;
        });
    }
    SelectCategoryToEdit(courseType) {
        this.courseType = courseType;
    }
    onChangePage(pageOfItems) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
};
CourseTypeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-course-type',
        templateUrl: './course-type.component.html',
        styleUrls: ['./course-type.component.css']
    })
], CourseTypeComponent);
export { CourseTypeComponent };
// pipe should be registered in app.module
let courseTypeFilterPipe = class courseTypeFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
courseTypeFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'courseTypeFilter'
    })
], courseTypeFilterPipe);
export { courseTypeFilterPipe };
//# sourceMappingURL=course-type.component.js.map