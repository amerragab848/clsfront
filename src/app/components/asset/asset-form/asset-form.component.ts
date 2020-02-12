import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AssetService } from 'src/app/core/services/asset/asset.service';
import { AssetGroupService } from 'src/app/core/services/asset-group/asset-group.service';
import { AssetVendorService } from 'src/app/core/services/asset-vendor/asset-vendor.service';
import { BranchService } from 'src/app/core/services/branch/branch.service';



@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css']
})
export class AssetFormComponent implements OnInit {


  asset : AssetModel=<AssetModel>{
    id :0
  };;
  assetGroups : AssetGroupModel[];
  assetVendors : AssetVendorModel[];
  branches : BranchModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  assetId = this.activatedRoute.snapshot.params.id;
  

  constructor(
    private _toastSrv : ToastService,
    private _assetService : AssetService,
    private _assetGroupService : AssetGroupService,
    private _assetVendorService : AssetVendorService,
    private _branchService : BranchService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) { }

  GetAssetById() {
    // let assetId = this.activatedRoute.snapshot.params.id;
    if(this.assetId != 0){
      this._assetService.GetAssetById(this.assetId).subscribe((data :any)=>{
        this.asset = data.result;
      })
    }
  }

  GetAssetGroup() {
    this._assetGroupService.GetAssetGroup().subscribe((data :any)=>{
       this.assetGroups = data.result;
       console.log(this.assetGroups)
    })
  }

  GetGroupSettings(id){
    this._assetGroupService.GetAssetGroupById(id).subscribe((data :any)=>{
      this.asset.isDepreciationable = data.result.isDepreciationable;
      this.asset.depreciatedByPercentage = data.result.depreciatedByPercentage;
      this.asset.depreciationAmount = data.result.depreciationAmount;
      this.asset.depreciationDuration = data.result.depreciationDuration;
      this.asset.assetMinmumAmount = data.result.assetMinmumAmount;
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

  ClearObject(){
    this.router.navigate(['/asset']);
  }

  SaveAsset()
  {
    this.btnClicked=true;
    this.asset.assetGroupId = parseInt(this.asset.assetGroupId.toString());
    this.asset.assetVendorId = parseInt(this.asset.assetVendorId.toString());
    this.asset.branchId = parseInt(this.asset.branchId  .toString());

    console.log(this.asset);

    if(this.assetId ==0){
      this._assetService.AddAsset(this.asset).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.btnClicked=false;
        }
        if(data.code === 500)
        {
          this._toastSrv.error("Failed",data.message);
          this.ClearObject();
          this.btnClicked=false;
        }
      },
      (error) =>{
        this.btnClicked=false;
        console.log(error);
      }
      );
    }
    else{
      this._assetService.EditAsset(this.asset).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.btnClicked=false;
        }
        if(data.code === 500)
        {
          this._toastSrv.error("Failed",data.message);
          this.ClearObject();
          this.btnClicked=false;
        }
      },
      (error) =>{
        if(error.error.code === 500){
          this.btnClicked=false;
        }
      }
      );
    }
  }

  ngOnInit() {
    this.GetAssetGroup();
    this.GetAssetVendor();
    this.GetBranch();
    this.GetAssetById();
  }
}

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