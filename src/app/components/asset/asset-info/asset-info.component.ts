import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AssetService } from 'src/app/core/services/asset/asset.service';

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
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _assetService : AssetService,
  ) { }

  GetAsset() {
    this._assetService.GetAsset().subscribe((data :any)=>{
       this.assets = data.result;
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ngOnInit() {
    this.GetAsset();
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
