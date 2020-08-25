import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let fileUpload = require('fuctbase64');
let AssetFormComponent = class AssetFormComponent {
    constructor(_toastSrv, _assetService, _assetGroupService, _assetVendorService, _branchService, activatedRoute, router) {
        this._toastSrv = _toastSrv;
        this._assetService = _assetService;
        this._assetGroupService = _assetGroupService;
        this._assetVendorService = _assetVendorService;
        this._branchService = _branchService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.asset = {
            id: 0
        };
        this.btnClicked = false;
        this.assetId = this.activatedRoute.snapshot.params.id;
        this.fileResult = null;
        this.fileInput = null;
    }
    GetAssetById() {
        // let assetId = this.activatedRoute.snapshot.params.id;
        if (this.assetId != 0) {
            this._assetService.GetAssetById(this.assetId).subscribe((data) => {
                this.asset = data.result;
                this.asset.accusationDate = this.asset.accusationDateString;
            });
        }
    }
    GetAssetGroup() {
        this._assetGroupService.GetAssetGroup().subscribe((data) => {
            this.assetGroups = data.result;
        });
    }
    GetGroupSettings(id) {
        this._assetGroupService.GetAssetGroupById(id).subscribe((data) => {
            this.asset.isDepreciationable = data.result.isDepreciationable;
            this.asset.depreciatedByPercentage = data.result.depreciatedByPercentage;
            this.asset.depreciationAmount = data.result.depreciationAmount;
            this.asset.depreciationDuration = data.result.depreciationDuration;
            this.asset.assetMinmumAmount = data.result.assetMinmumAmount;
        });
    }
    GetAssetVendor() {
        this._assetVendorService.GetAssetVendor().subscribe((data) => {
            this.assetVendors = data.result;
        });
    }
    GetBranch() {
        this._branchService.GetBranches().subscribe((data) => {
            this.branches = data.result;
        });
    }
    ClearObject() {
        this.router.navigate(['/app/asset']);
    }
    onFileChange(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield fileUpload(event);
                this.fileResult = result;
            }
            catch (_a) {
                this.fileResult = null;
            }
        });
    }
    SaveAsset() {
        this.btnClicked = true;
        this.asset.assetGroupId = parseInt(this.asset.assetGroupId.toString());
        this.asset.assetVendorId = parseInt(this.asset.assetVendorId.toString());
        this.asset.branchId = parseInt(this.asset.branchId.toString());
        this.asset.price = parseFloat(this.asset.price.toString());
        this.asset.quantity = parseInt(this.asset.quantity.toString());
        if (this.fileResult != null) {
            this.asset.base64File = this.fileResult.base64;
            this.asset.fileName = this.fileResult.name;
        }
        if (this.assetId == 0) {
            this._assetService.AddAsset(this.asset).subscribe((data) => {
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
            this._assetService.EditAsset(this.asset).subscribe((data) => {
                if (data.code === 200) {
                    this._toastSrv.success("", "Saved Successfully");
                    this.ClearObject();
                    this.btnClicked = false;
                }
                if (data.code === 500) {
                    this._toastSrv.error("Failed", data.message);
                    this.btnClicked = false;
                }
            }, (error) => {
                if (error.error.code === 500) {
                    this.btnClicked = false;
                }
            });
        }
    }
    ngOnInit() {
        this.GetAssetGroup();
        this.GetAssetVendor();
        this.GetBranch();
        this.GetAssetById();
    }
};
AssetFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-asset-form',
        templateUrl: './asset-form.component.html',
        styleUrls: ['./asset-form.component.css']
    })
], AssetFormComponent);
export { AssetFormComponent };
//# sourceMappingURL=asset-form.component.js.map