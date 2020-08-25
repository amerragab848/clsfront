import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let YearVacationComponent = class YearVacationComponent {
    constructor(datepipe, _toastSrv, _vacationService) {
        this.datepipe = datepipe;
        this._toastSrv = _toastSrv;
        this._vacationService = _vacationService;
        this.vacation = {
            id: 0
        };
        this.btnClicked = false;
    }
    ngOnInit() {
        this.GetVacation();
    }
    GetVacation() {
        this._vacationService.GetVacation().subscribe((data) => {
            console.log(data);
            this.vacations = data.result;
            console.log(this.vacations);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.vacation = {
            id: 0
        };
        this.GetVacation();
    }
    SaveVacation() {
        this.btnClicked = true;
        if (this.vacation.id == 0) {
            this._vacationService.AddVacation(this.vacation).subscribe((data) => {
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
            this._vacationService.EditVacation(this.vacation).subscribe((data) => {
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
    DeleteVacation(id) {
        this._vacationService.DeleteVacation(id).subscribe((data) => {
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
    SelectVacationToEdit(vacation) {
        this.vacation = vacation;
        this.vacation.startDate = this.datepipe.transform(vacation.startDate, 'yyyy-MM-dd');
        this.vacation.endDate = this.datepipe.transform(vacation.endDate, 'yyyy-MM-dd');
    }
};
YearVacationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-year-vacation',
        templateUrl: './year-vacation.component.html',
        styleUrls: ['./year-vacation.component.css']
    })
], YearVacationComponent);
export { YearVacationComponent };
let yearVacationFilterPipe = class yearVacationFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.startDate.toString().toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || c.endDate.toString().toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
yearVacationFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'yearVacationFilter'
    })
], yearVacationFilterPipe);
export { yearVacationFilterPipe };
//# sourceMappingURL=year-vacation.component.js.map