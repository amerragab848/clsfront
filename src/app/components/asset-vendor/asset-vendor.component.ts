import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AssetVendorService } from 'src/app/core/services/asset-vendor/asset-vendor.service';

import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
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

@Component({
  selector: 'app-asset-vendor',
  templateUrl: './asset-vendor.component.html',
  styleUrls: ['./asset-vendor.component.css']
})
export class AssetVendorComponent implements OnInit {

  assetVendor : AssetVendorModel =<AssetVendorModel>{
    id :0
  };

 // assetVendors : AssetVendorModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <AssetVendorModel> (false, []);  
  assetVendors: MatTableDataSource < AssetVendorModel > ;  

  constructor(
    private _toastSrv : ToastService,
    private _assetVendorService : AssetVendorService,
  ) { }

  GetAssetVendor() {
    this._assetVendorService.GetAssetVendor().subscribe((data :any)=>{
       this.assetVendors = data.result;
       console.log(this.assetVendors)
    })
  } 

//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.assetVendors && this.assetVendors.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: AssetVendorModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//


  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.assetVendor =<AssetVendorModel>{
      id:0
    };
    this.GetAssetVendor();
  }

  SaveAssetVendor()
  {
    this.btnClicked=true;
    if(this.assetVendor.id ==0){
      this._assetVendorService.AddAssetVendor(this.assetVendor).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetAssetVendor();
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
      this._assetVendorService.EditAssetVendor(this.assetVendor).subscribe((data : any) =>{
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

  DeleteAssetVendor(id)
  {
      this._assetVendorService.DeleteAssetVendor(id).subscribe((data : any) =>{
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
  DeleteAssetVendorData()
  {
    
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._assetVendorService.DeleteAssetVendor(id).subscribe((data : any) =>{
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
  SelectAssetVendorToEdit(vendor)
  {
    this.assetVendor = vendor;
  }
  SelectAssetVendorForEdit()
  {
    const vendor = this.selection.selected; 
    if (vendor.length > 0) { 
      this.assetVendor = vendor[0];
     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
    			
   
  }
  ngOnInit() {
    this.GetAssetVendor();
  }

}

@Pipe({
  name:'assetVendorFilter'
})
export class assetVendorFilterPipe implements PipeTransform{
  transform(contents : AssetVendorModel[] , searchKey) : AssetVendorModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
