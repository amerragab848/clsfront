import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AssetGroupService } from 'src/app/core/services/asset-group/asset-group.service';

import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
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

  //assetGroups : AssetGroupModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <AssetGroupModel> (false, []);  
  assetGroups: MatTableDataSource < AssetGroupModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _assetGroupService : AssetGroupService,
  ) { }

  //
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.assetGroups && this.assetGroups.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: AssetGroupModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  GetAssetGroup() {
    this._assetGroupService.GetAssetGroup().subscribe((data :any)=>{
       this.assetGroups = data.result;
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
    if (this.assetGroup.depreciatedByPercentage && this.assetGroup.depreciationAmount>100) {
      this._toastSrv.error("Failed", "Depreciation Amount should be less than 100");
  } else {
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
  }

  DeleteAssetGroup(id)
  {
      this._assetGroupService.DeleteAssetGroup(id).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("Success","");
          this.ClearObject();
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
  DeleteAssetGroupData()
  {
    
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._assetGroupService.DeleteAssetGroup(id).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("Success","");
          this.ClearObject();
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
  SelectAssetGroupToEdit(group)
  {
    this.assetGroup = group;
  }
  SelectAssetGroupForEdit()
  {
    const group = this.selection.selected; 
    if (group.length > 0) { 
      this.assetGroup = group[0];
     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
    			
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
