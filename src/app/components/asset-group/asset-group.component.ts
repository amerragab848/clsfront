import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AssetGroupService } from 'src/app/core/services/asset-group/asset-group.service';

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

@Component({
  selector: 'app-asset-group',
  templateUrl: './asset-group.component.html',
  styleUrls: ['./asset-group.component.css']
})
export class AssetGroupComponent implements OnInit {

  assetGroup : AssetGroupModel =<AssetGroupModel>{
    id :0
  };

  assetGroups : AssetGroupModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _assetGroupService : AssetGroupService,
  ) { }

  GetAssetGroup() {
    this._assetGroupService.GetAssetGroup().subscribe((data :any)=>{
       this.assetGroups = data.result;
       console.log(this.assetGroups)
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.assetGroup =<AssetGroupModel>{
      id:0
    };
    this.GetAssetGroup();
  }

  SaveAssetGroup()
  {
    this.assetGroup.depreciationAmount = parseInt(this.assetGroup.depreciationAmount.toString());
    this.assetGroup.depreciationDuration = parseInt(this.assetGroup.depreciationDuration.toString());
    this.assetGroup.assetMinmumAmount = parseInt(this.assetGroup.assetMinmumAmount.toString());
    this.btnClicked=true;
    if(this.assetGroup.id ==0){
      this._assetGroupService.AddAssetGroup(this.assetGroup).subscribe((data : any) =>{
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
      this._assetGroupService.EditAssetGroup(this.assetGroup).subscribe((data : any) =>{
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

  SelectAssetGroupToEdit(group)
  {
    this.assetGroup = group;
  }

  ngOnInit() {
    this.GetAssetGroup(); 
  }

}

@Pipe({
  name:'assetGroupFilter'
})
export class assetGroupFilterPipe implements PipeTransform{
  transform(contents : AssetGroupModel[] , searchKey) : AssetGroupModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
