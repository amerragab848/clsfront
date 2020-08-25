import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let LearningPathComponent = class LearningPathComponent {
    constructor(_toastSrv, _learningPathService) {
        this._toastSrv = _toastSrv;
        this._learningPathService = _learningPathService;
        this.learningPath = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetLearningPathes() {
        this._learningPathService.GetLearningPathes().subscribe((data) => {
            this.learningPathes = data.result;
            console.log(this.learningPathes);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.learningPath = {
            id: 0
        };
        this.GetLearningPathes();
    }
    SaveLearningPath() {
        this.btnClicked = true;
        if (this.learningPath.id == 0) {
            this._learningPathService.AddLearningPath(this.learningPath).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.GetLearningPathes();
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
            this._learningPathService.EditLearningPath(this.learningPath).subscribe((data) => {
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
    SelectLearningPathToEdit(learningPath) {
        this.learningPath = learningPath;
    }
    ngOnInit() {
        this.GetLearningPathes();
    }
};
LearningPathComponent = tslib_1.__decorate([
    Component({
        selector: 'app-learning-path',
        templateUrl: './learning-path.component.html',
        styleUrls: ['./learning-path.component.css']
    })
], LearningPathComponent);
export { LearningPathComponent };
let learningPathFilterPipe = class learningPathFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
learningPathFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'learningPathFilter'
    })
], learningPathFilterPipe);
export { learningPathFilterPipe };
//# sourceMappingURL=learning-path.component.js.map