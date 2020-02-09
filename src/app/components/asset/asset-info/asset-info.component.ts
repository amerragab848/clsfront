import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AssetService } from 'src/app/core/services/asset/asset.service';
import { AssetGroupService } from 'src/app/core/services/asset-group/asset-group.service';
import { AssetVendorService } from 'src/app/core/services/asset-vendor/asset-vendor.service';
import { BranchService } from 'src/app/core/services/branch/branch.service';

export interface AssetModel 
{
  id:number;
  name:string;
  ssn: string;
  barcode: string;
  isDepreciationable: boolean;
  depreciatedByPercentage: boolean;
  depreciationAmount: number;
  depreciationDuration: number;
  price: number;
  quantity: number;
  assetMinmumAmount: number;
  note: string;
  isNew: boolean;
  haveInsurance: boolean;
  insuranceCompany: string;
  insuranceAmount: string;
  insuranceDuration: number;
  manufacturer: string;
  model: string;
  manufacturingYear: number;
  accusationDate: string;
  assetVendorName: string;
  assetVendorId: number;
  assetGroupName: string;
  assetGroupId: number;
  branchName: string;
  branchId: number;
}

export interface AssetGroupModel 
{
  id:number;
  name:string;
  isDepreciationable:boolean;
  depreciatedByPercentage:boolean;
  depreciationAmount:number;
  depreciationDuration:number;
  assetMinmumAmount:number;
}

export interface AssetVendorModel 
{
  id:number;
  name:string;
  email: string;
  number: string;
  mobileNumber: string;
  phone: string;
  fax: string;
  country: string;
  address: string;
  contactPersonName: string;
  contactPersonNumber: string;
  contactPersonEmail: string;
  commercialFileNumber: string;
  taxCard: string;
  commercialFilePath: string;
  taxCardFilePath: string;
}

export interface BranchModel 
{
  id:number;
  name:string;
  location:string;
}

@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.css']
})
export class AssetInfoComponent implements OnInit {

  asset : AssetModel =<AssetModel>{
    id :0
  };

  assets : AssetModel[];
  assetGroups : AssetGroupModel[];
  assetVendors : AssetVendorModel[];
  branches : BranchModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _assetService : AssetService,
    private _assetGroupService : AssetGroupService,
    private _assetVendorService : AssetVendorService,
    private _branchService : BranchService,
  ) { }

  GetAsset() {
    this._assetService.GetAsset().subscribe((data :any)=>{
       this.assets = data.result;
       console.log(this.assets)
    })
  }

  GetAssetGroup() {
    this._assetGroupService.GetAssetGroup().subscribe((data :any)=>{
       this.assetGroups = data.result;
       console.log(this.assetGroups)
    })
  }

  GetAssetVendor() {
    this._assetVendorService.GetAssetVendor().subscribe((data :any)=>{
       this.assetVendors = data.result;
       console.log(this.assetVendors)
    })
  }

  GetBranch() {
    this._branchService.GetBranches().subscribe((data :any)=>{
       this.branches = data.result;
       console.log(this.branches)
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  SelectAssetToEdit(asset)
  {
    this.asset = asset;
  }

  ngOnInit() {
    this.GetAsset();
    this.GetAssetGroup();
    this.GetAssetVendor();
    this.GetBranch();
  }

}

@Pipe({
  name:'assetFilter'
})
export class assetFilterPipe implements PipeTransform{
  transform(contents : AssetModel[] , searchKey) : AssetModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
