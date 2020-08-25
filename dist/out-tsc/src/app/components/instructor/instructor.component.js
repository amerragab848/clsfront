import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let fileUpload = require('fuctbase64');
let InstructorComponent = class InstructorComponent {
    constructor(_toastSrv, _instructorService) {
        this._toastSrv = _toastSrv;
        this._instructorService = _instructorService;
        this.fileImageResult = null;
        this.fileCVResult = null;
        this.fileNationalIdResult = null;
        this.instructor = {
            id: 0
        };
        this.btnClicked = false;
    }
    onFileImageChange(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield fileUpload(event);
                this.fileImageResult = result;
            }
            catch (_a) {
                this.fileImageResult = null;
            }
        });
    }
    onFileCVChange(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield fileUpload(event);
                this.fileCVResult = result;
            }
            catch (_a) {
                this.fileCVResult = null;
            }
        });
    }
    onFileNationalIdChange(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield fileUpload(event);
                this.fileNationalIdResult = result;
            }
            catch (_a) {
                this.fileNationalIdResult = null;
            }
        });
    }
    GetInstructors() {
        this._instructorService.GetInstructors().subscribe((data) => {
            this.instructors = data.result;
            console.log(this.instructors);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.instructor = {
            id: 0
        };
        this.GetInstructors();
        this.fileImageResult = null;
        this.fileImageInput = null;
        this.fileCVInput = null;
        this.fileNationalIdInput = null;
    }
    SaveInstructor() {
        this.btnClicked = true;
        if (this.fileImageResult != null) {
            this.instructor.base64File = this.fileImageResult.base64;
            this.instructor.fileName = this.fileImageResult.name;
        }
        if (this.fileNationalIdResult != null) {
            this.instructor.nationalIdBase64 = this.fileNationalIdResult.base64;
            this.instructor.nationalIdFileName = this.fileNationalIdResult.name;
        }
        if (this.fileCVResult != null) {
            this.instructor.cvBase64 = this.fileCVResult.base64;
            this.instructor.cvFileName = this.fileCVResult.name;
        }
        if (this.instructor.id == 0) {
            this._instructorService.AddInstructor(this.instructor).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetInstructors();
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
            this._instructorService.EditInstructor(this.instructor).subscribe((data) => {
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
    SelectInstructorToEdit(instructor) {
        this.instructor = instructor;
    }
    ngOnInit() {
        this.GetInstructors();
    }
    DeleteInstructor(id) {
        this._instructorService.DeleteInstructor(id).subscribe((data) => {
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
InstructorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-instructor',
        templateUrl: './instructor.component.html',
        styleUrls: ['./instructor.component.css']
    })
], InstructorComponent);
export { InstructorComponent };
let instructorFilterPipe = class instructorFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.number.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.phone.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.email.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
instructorFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'instructorFilter'
    })
], instructorFilterPipe);
export { instructorFilterPipe };
//# sourceMappingURL=instructor.component.js.map