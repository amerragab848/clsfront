import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import {MaterialTypeService} from '../../../core/services/material-type/material-type.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import { from } from 'rxjs';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
@Component({
  selector: 'app-material-type',
  templateUrl: './material-type.component.html',
  styleUrls: ['./material-type.component.css']
})
export class MaterialTypeComponent implements OnInit {

  materialType : MaterialTypeModel =<MaterialTypeModel>{
    id :0
  };
  //materialTypes : MaterialTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  errorMessage:string;

  selection = new SelectionModel <MaterialTypeModel> (false, []);  
  materialTypes: MatTableDataSource < MaterialTypeModel > ;  

  constructor(
    private _toastSrv : ToastService,
    private _materialTypeService : MaterialTypeService
    ) {
  }
  ngOnInit() {
    this.GetMaterialTypes();
  }

  ClearObject(){
    
    this.materialType =<MaterialTypeModel>{
      id:0
    };
    this.GetMaterialTypes();
  }
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.materialTypes && this.materialTypes.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: MaterialTypeModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  SaveMaterialType()
  {
    this.btnClicked=true;
    if(this.materialType.id ==0){
      this._materialTypeService.AddMaterialType(this.materialType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetMaterialTypes();
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
        // if(error.error.code === 500){
        //   this.toastr.error("",error.error.responseException.exceptionMessage);
        //   this.btnClicked=false;
        // }
        this.btnClicked=false;
        console.log(error);
      }
      );
    }
    else{
      this._materialTypeService.EditMaterialType(this.materialType).subscribe((data : any) =>{
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
          // this.toastr.error("",error.error.responseException.exceptionMessage);
          this.btnClicked=false;
        }
      }
      );
    }
  }

  DeleteType(id)
  {
      this._materialTypeService.DeleteMaterialType(id).subscribe((data : any) =>{
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
  DeleteMaterial()
  {
    debugger;
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._materialTypeService.DeleteMaterialType(id).subscribe((data : any) =>{
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
  GetMaterialTypes()
  {
    this._materialTypeService.GetMaterialTypes().subscribe((data :any)=>{
       this.materialTypes = data.result;
    })
  } 

  SelectCategoryToEdit(materialType)
  {
    this.materialType = materialType;
  }

  SelectToEdit()
  {
    const material = this.selection.selected; 
    if (material.length > 0) { 
      this.materialType = material[0];

     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
    
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}

export interface MaterialTypeModel 
{
  id:number;
  name:string;
}


// pipe should be registered in app.module
@Pipe({
  name:'materialTypeFilter'
})
export class materialTypeFilterPipe implements PipeTransform{
  transform(contents : MaterialTypeModel[] , searchKey) : MaterialTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}