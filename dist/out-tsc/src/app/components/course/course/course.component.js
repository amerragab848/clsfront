import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
// Imports
let fileUpload = require('fuctbase64');
let CourseComponent = class CourseComponent {
    constructor(_materialTypeSrv, _labTypeSrv, _examTypeSrv, _deliveryTypeSrv, _courseTypeSrv, _courseCategorySrv, _courseService, _vendoerSrv, _toastSrv, _subCategorySrv, _learningPathSrv) {
        this._materialTypeSrv = _materialTypeSrv;
        this._labTypeSrv = _labTypeSrv;
        this._examTypeSrv = _examTypeSrv;
        this._deliveryTypeSrv = _deliveryTypeSrv;
        this._courseTypeSrv = _courseTypeSrv;
        this._courseCategorySrv = _courseCategorySrv;
        this._courseService = _courseService;
        this._vendoerSrv = _vendoerSrv;
        this._toastSrv = _toastSrv;
        this._subCategorySrv = _subCategorySrv;
        this._learningPathSrv = _learningPathSrv;
        this.course = {
            id: 0
        };
        this.btnClicked = false;
        this.fileResult = null;
        this.fileInput = null;
    }
    ngOnInit() {
        this.GetCourses();
        this.GetAllLockups();
    }
    GetCourses() {
        this._courseService.GetCoursees().subscribe((data) => {
            this.courses = data.result;
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.course = {
            id: 0
        };
        this.GetCourses();
        this.fileResult = null;
        this.fileInput = null;
    }
    onFileChange(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield fileUpload(event);
                this.fileResult = result;
                console.log(this.fileResult);
            }
            catch (_a) {
                this.fileResult = null;
            }
        });
    }
    SaveCourse() {
        try {
            this.course.courseSubCategoryId = parseInt(this.course.courseSubCategoryId.toString());
        }
        catch (_a) {
            this.course.courseSubCategoryId = null;
        }
        this.course.courseCategoryId = parseInt(this.course.courseCategoryId.toString());
        this.btnClicked = true;
        if (this.fileResult != null) {
            this.course.base64File = this.fileResult.base64;
            this.course.fileName = this.fileResult.name;
        }
        if (this.course.courseSubCategoryId == 0) {
            this.course.courseSubCategoryId = null;
        }
        console.log(this.course);
        if (this.course.id == 0) {
            this._courseService.AddCourse(this.course).subscribe((data) => {
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
            this._courseService.EditCourse(this.course).subscribe((data) => {
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
    SelectCourseToEdit(course) {
        this.course = course;
        console.log(course);
    }
    DeleteCourse(id) {
        this._courseService.DeleteCourse(id).subscribe((data) => {
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
    // Get Lockups
    GetAllLockups() {
        this.GetCourseCategories();
        this.GetExamTypes();
        this.GetLabTypes();
        this.GetMaterialTypes();
        this.GetVendors();
        this.GetLearningPaths();
    }
    GetCourseCategories() {
        this._courseCategorySrv.GetCourseCategories().subscribe((data) => {
            this.courseCategories = data.result;
        });
    }
    GetLearningPaths() {
        this._learningPathSrv.GetLearningPathes().subscribe((data) => {
            this.learningPaths = data.result;
        });
    }
    GetSubCategories(id) {
        console.log(id);
        this._subCategorySrv.GetSubCategories().subscribe((data) => {
            this.courseSubCategories = data.result.filter(c => c.courseCategoryId == id);
            console.log(this.courseSubCategories);
        });
    }
    GetExamTypes() {
        this._examTypeSrv.GetExamTypes().subscribe((data) => {
            this.examTypes = data.result;
        });
    }
    GetLabTypes() {
        this._labTypeSrv.GetLabTypes().subscribe((data) => {
            this.labTypes = data.result;
        });
    }
    GetMaterialTypes() {
        this._materialTypeSrv.GetMaterialTypes().subscribe((data) => {
            this.materialTypes = data.result;
        });
    }
    GetVendors() {
        this._vendoerSrv.GetVendors().subscribe((data) => {
            this.vendors = data.result;
        });
    }
};
CourseComponent = tslib_1.__decorate([
    Component({
        selector: 'app-course',
        templateUrl: './course.component.html',
        styleUrls: ['./course.component.css']
    })
], CourseComponent);
export { CourseComponent };
let courseFilterPipe = class courseFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.courseCategoryName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.examTypeName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.vendorName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.materialTypeName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.courseSubCategoryName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
courseFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'courseFilter'
    })
], courseFilterPipe);
export { courseFilterPipe };
//# sourceMappingURL=course.component.js.map