import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let FacilityComponent = class FacilityComponent {
    constructor(_toastSrv, _facilityService, activatedRoute) {
        this._toastSrv = _toastSrv;
        this._facilityService = _facilityService;
        this.activatedRoute = activatedRoute;
        this.facility = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetFacilities() {
        this._facilityService.GetFacilities().subscribe((data) => {
            this.facilities = data.result.filter(f => f.labId == this.activatedRoute.snapshot.params.id);
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.facility = {
            id: 0
        };
        this.GetFacilities();
    }
    SaveFacility() {
        let labId = this.activatedRoute.snapshot.params.id;
        this.facility.labId = parseInt(labId.toString());
        this.facility.number = parseInt(this.facility.number.toString());
        this.btnClicked = true;
        if (this.facility.id == 0) {
            this._facilityService.AddFacility(this.facility).subscribe((data) => {
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
            this._facilityService.EditFacility(this.facility).subscribe((data) => {
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
    SelectFacilityToEdit(facility) {
        this.facility = facility;
    }
    DeleteFacility(id) {
        this._facilityService.DeleteFacility(id).subscribe((data) => {
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
        this.GetFacilities();
    }
};
FacilityComponent = tslib_1.__decorate([
    Component({
        selector: 'app-facility',
        templateUrl: './facility.component.html',
        styleUrls: ['./facility.component.css']
    })
], FacilityComponent);
export { FacilityComponent };
let facilityFilterPipe = class facilityFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
facilityFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'facilityFilter'
    })
], facilityFilterPipe);
export { facilityFilterPipe };
//# sourceMappingURL=facility.component.js.map