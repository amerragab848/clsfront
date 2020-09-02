import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { DeliveryTypeService } from 'src/app/core/services/deliver-type/delivery-type.service';

import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
export interface DeliveryTypeModel 
{
  id:number;
  name:string;
}

@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.component.html',
  styleUrls: ['./delivery-type.component.css']
})
export class DeliveryTypeComponent implements OnInit {

  deliveryType : DeliveryTypeModel =<DeliveryTypeModel>{
    id :0
  };

 // deliveryTypes : DeliveryTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <DeliveryTypeModel> (false, []);  
  deliveryTypes: MatTableDataSource < DeliveryTypeModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _deliveryTypeService : DeliveryTypeService
  ) { }

//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.deliveryTypes && this.deliveryTypes.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() :this.selection.select();// this.deliveryTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: DeliveryTypeModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  GetDeliveryTypes()
  {
    this._deliveryTypeService.GetDeliveryTypes().subscribe((data :any)=>{
       this.deliveryTypes = data.result;
       console.log(this.deliveryType);
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.deliveryType =<DeliveryTypeModel>{
      id:0
    };
    this.GetDeliveryTypes();
  }

  SaveDeliveryType()
  {
    this.btnClicked=true;
    if(this.deliveryType.id ==0){
      this._deliveryTypeService.AddDeliveryType(this.deliveryType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetDeliveryTypes();
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
      this._deliveryTypeService.EditDeliveryType(this.deliveryType).subscribe((data : any) =>{
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

   DeleteType(id)
  {
      this._deliveryTypeService.DeleteDeliveryType(id).subscribe((data : any) =>{
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
  DeleteDeliveryType()
  {
    debugger;
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
      this._deliveryTypeService.DeleteDeliveryType(id).subscribe((data : any) =>{
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
  SelectTypeToEdit(deliveryType)
  {
    this.deliveryType = deliveryType;
  }
  SelectDeliveryTypeToEdit()
  {
    const deliveryType = this.selection.selected; 
    this.deliveryType = deliveryType[0];
  }
  ngOnInit() {
    this.GetDeliveryTypes();
  }

}

@Pipe({
  name:'deliveryTypeFilter'
})
export class deliveryTypeFilterPipe implements PipeTransform{
  transform(contents : DeliveryTypeModel[] , searchKey) : DeliveryTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
