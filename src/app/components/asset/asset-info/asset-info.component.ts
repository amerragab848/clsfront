import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AssetService } from 'src/app/core/services/asset/asset.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  //assets : AssetModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <AssetModel> (false, []);  
  assets: MatTableDataSource < AssetModel > ; 
  constructor(
    private route: Router,
    private _assetService : AssetService,
    private _toastSrv : ToastService
  ) { }

  ClearObject() {
   this.asset  =<AssetModel>{
      id :0
    };
   
  }
  GetAsset() {
    this._assetService.GetAsset().subscribe((data :any)=>{
       this.assets = data.result;
    })
  }

//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.assets && this.assets.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: AssetModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//


  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  
  DeleteAsset(id)
  {
      this._assetService.DeleteAsset(id).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("Success","");
          this.GetAsset();
        }
        if(data.code === 500)
        {
          this._toastSrv.error("Failed",data.message);
        }
      },
      (error) =>{
        this._toastSrv.error("Failed","You can not delete this record");
      }
      );
  }
  DeleteAssetData()
  {
       const numSelected = this.selection.selected;  
       if (numSelected.length > 0) {  
        var id=numSelected[0].id;
        this._assetService.DeleteAsset(id).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("Success","");
          this.GetAsset();
        }
        if(data.code === 500)
        {
          this._toastSrv.error("Failed",data.message);
        }
      },
      (error) =>{
        this._toastSrv.error("Failed","You can not delete this record");
      }
      );
       }
       else {  
               
                 this._toastSrv.error("Failed","Select at least one row");
       
             }
      
  }
  GoToAssetForm() {
    this.ClearObject();
   const numSelected = this.selection.selected; 
   this.asset = numSelected[0];
   if (numSelected.length > 0) { 
   this.route.navigate(['/app/assetform', this.asset.id ]);

    }
   else {  
           
             this._toastSrv.error("Failed","Select at least one row");
   
         }
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
