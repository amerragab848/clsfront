import * as tslib_1 from "tslib";
import { Component, Pipe } from '@angular/core';
let AssetInfoComponent = class AssetInfoComponent {
    constructor(_assetService, _toastSrv) {
        this._assetService = _assetService;
        this._toastSrv = _toastSrv;
        this.asset = {
            id: 0
        };
        this.btnClicked = false;
    }
    GetAsset() {
        this._assetService.GetAsset().subscribe((data) => {
            this.assets = data.result;
        });
    }
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
    DeleteAsset(id) {
        this._assetService.DeleteAsset(id).subscribe((data) => {
            if (data.code === 200) {
                this._toastSrv.success("Success", "");
                this.GetAsset();
            }
            if (data.code === 500) {
                this._toastSrv.error("Failed", data.message);
            }
        }, (error) => {
            this._toastSrv.error("Failed", "You can not delete this record");
        });
    }
    ngOnInit() {
        this.GetAsset();
    }
};
AssetInfoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-asset-info',
        templateUrl: './asset-info.component.html',
        styleUrls: ['./asset-info.component.css']
    })
], AssetInfoComponent);
export { AssetInfoComponent };
let assetFilterPipe = class assetFilterPipe {
    transform(contents, searchKey) {
        if (!contents || !searchKey) {
            return contents;
        }
        return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
};
assetFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'assetFilter'
    })
], assetFilterPipe);
export { assetFilterPipe };
//# sourceMappingURL=asset-info.component.js.map