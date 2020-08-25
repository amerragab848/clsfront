import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let AssetGroupComponent = class AssetGroupComponent {
    constructor(_toastSrv, _assetGroupService) {
        this._toastSrv = _toastSrv;
        this._assetGroupService = _assetGroupService;
        this.assetGroup = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetAssetGroup() {
        this._assetGroupService.GetAssetGroup().subscribe((data) => {
            this.assetGroups = data.result;
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    ClearObject() {
        this.assetGroup = {
            id: 0
        };
        this.GetAssetGroup();
    }
    SaveAssetGroup() {
        if (this.assetGroup.depreciatedByPercentage && this.assetGroup.depreciationAmount > 100) {
            this._toastSrv.error("Failed", "Depreciation Amount should be less than 100");
        }
        else {
            this.assetGroup.depreciationAmount = parseInt(this.assetGroup.depreciationAmount.toString());
            this.assetGroup.depreciationDuration = parseInt(this.assetGroup.depreciationDuration.toString());
            this.assetGroup.assetMinmumAmount = parseInt(this.assetGroup.assetMinmumAmount.toString());
            this.btnClicked = true;
            if (this.assetGroup.id == 0) {
                this._assetGroupService.AddAssetGroup(this.assetGroup).subscribe((data) => {
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
                this._assetGroupService.EditAssetGroup(this.assetGroup).subscribe((data) => {
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
    }
    DeleteAssetGroup(id) {
        this._assetGroupService.DeleteAssetGroup(id).subscribe((data) => {
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
    SelectAssetGroupToEdit(group) {
        this.assetGroup = group;
    }
    ngOnInit() {
        this.GetAssetGroup();
    }
};
AssetGroupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-asset-group',
        templateUrl: './asset-group.component.html',
        styleUrls: ['./asset-group.component.css']
    })
], AssetGroupComponent);
export { AssetGroupComponent };
let assetGroupFilterPipe = class assetGroupFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
assetGroupFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'assetGroupFilter'
    })
], assetGroupFilterPipe);
export { assetGroupFilterPipe };
//# sourceMappingURL=asset-group.component.js.map