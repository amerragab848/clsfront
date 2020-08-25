import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let CourseCategoryComponent = class CourseCategoryComponent {
    constructor(_toastSrv, _courseCategoryService) {
        this._toastSrv = _toastSrv;
        this._courseCategoryService = _courseCategoryService;
        this.courseCategory = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetCourseCategories() {
        this._courseCategoryService.GetCourseCategories().subscribe((data) => {
            this.courseCategories = data.result;
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.courseCategory = {
            id: 0
        };
        this.GetCourseCategories();
    }
    SaveCourseCategory() {
        this.btnClicked = true;
        if (this.courseCategory.id == 0) {
            this._courseCategoryService.AddCourseCategory(this.courseCategory).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetCourseCategories();
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
            this._courseCategoryService.EditCourseCategory(this.courseCategory).subscribe((data) => {
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
    DeleteCategory(id) {
        this._courseCategoryService.DeleteCategory(id).subscribe((data) => {
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
    SelectCategoryToEdit(courseCategory) {
        this.courseCategory = courseCategory;
    }
    ngOnInit() {
        this.GetCourseCategories();
    }
};
CourseCategoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-course-category',
        templateUrl: './course-category.component.html',
        styleUrls: ['./course-category.component.css']
    })
], CourseCategoryComponent);
export { CourseCategoryComponent };
let courseCategoryFilterPipe = class courseCategoryFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
courseCategoryFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'courseCategoryFilter'
    })
], courseCategoryFilterPipe);
export { courseCategoryFilterPipe };
//# sourceMappingURL=course-category.component.js.map