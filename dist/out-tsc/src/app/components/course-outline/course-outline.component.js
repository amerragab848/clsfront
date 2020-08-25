import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let CourseOutlineComponent = class CourseOutlineComponent {
    constructor(_toastSrv, _courseOutlineService, activatedRoute) {
        this._toastSrv = _toastSrv;
        this._courseOutlineService = _courseOutlineService;
        this.activatedRoute = activatedRoute;
        this.courseOutline = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetCourseOutlines() {
        this._courseOutlineService.GetCourseOutlines().subscribe((data) => {
            this.courseOutlines = data.result.filter(o => o.courseId == this.activatedRoute.snapshot.params.id);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.courseOutline = {
            id: 0
        };
        this.GetCourseOutlines();
    }
    SaveCourseOutline() {
        let courseId = this.activatedRoute.snapshot.params.id;
        this.courseOutline.courseId = parseInt(courseId.toString());
        this.btnClicked = true;
        if (this.courseOutline.id == 0) {
            this._courseOutlineService.AddCourseOutline(this.courseOutline).subscribe((data) => {
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
            this._courseOutlineService.EditCourseOutline(this.courseOutline).subscribe((data) => {
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
    SelectCourseOutlineToEdit(outline) {
        this.courseOutline = outline;
    }
    ngOnInit() {
        this.GetCourseOutlines();
    }
};
CourseOutlineComponent = tslib_1.__decorate([
    Component({
        selector: 'app-course-outline',
        templateUrl: './course-outline.component.html',
        styleUrls: ['./course-outline.component.css']
    })
], CourseOutlineComponent);
export { CourseOutlineComponent };
let courseOutlineFilterPipe = class courseOutlineFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.title.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
courseOutlineFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'courseOutlineFilter'
    })
], courseOutlineFilterPipe);
export { courseOutlineFilterPipe };
//# sourceMappingURL=course-outline.component.js.map