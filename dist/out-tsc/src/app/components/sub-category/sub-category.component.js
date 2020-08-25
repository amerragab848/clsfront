import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let SubCategoryComponent = class SubCategoryComponent {
    constructor(_toastSrv, _SubCategoryService, _courseCategoryService) {
        this._toastSrv = _toastSrv;
        this._SubCategoryService = _SubCategoryService;
        this._courseCategoryService = _courseCategoryService;
        this.subCategory = {
            id: 0
        };
        this.category = {
            id: 0
        };
        this.btnClicked = false;
    }
    ngOnInit() {
        this.GetSubCategories();
        this.GetCourseCategories();
    }
    GetSubCategories() {
        this._SubCategoryService.GetSubCategories().subscribe((data) => {
            this.subCategories = data.result;
        });
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
        this.subCategory = {
            id: 0
        };
        this.GetSubCategories();
    }
    SaveSubCategory() {
        this.btnClicked = true;
        if (this.subCategory.id == 0) {
            this._SubCategoryService.AddSubCategory(this.subCategory).subscribe((data) => {
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
            this._SubCategoryService.EditSubCategory(this.subCategory).subscribe((data) => {
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
    SelectSubCategoryToEdit(subCategory) {
        this.subCategory = subCategory;
    }
    DeleteSubCategory(id) {
        this._SubCategoryService.DeleteCourseSubCategory(id).subscribe((data) => {
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
};
SubCategoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sub-category',
        templateUrl: './sub-category.component.html',
        styleUrls: ['./sub-category.component.css']
    })
], SubCategoryComponent);
export { SubCategoryComponent };
let subCategoryFilterPipe = class subCategoryFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.courseCategoryName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
subCategoryFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'subCategoryFilter'
    })
], subCategoryFilterPipe);
export { subCategoryFilterPipe };
//# sourceMappingURL=sub-category.component.js.map