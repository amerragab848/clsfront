import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import {LabTypeService} from '../../../core/services/lab-type/lab-type.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import { from } from 'rxjs';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
@Component({
  selector: 'app-lab-type',
  templateUrl: './lab-type.component.html',
  styleUrls: ['./lab-type.component.css']
})
export class LabTypeComponent implements OnInit {

  labType : LabTypeModel =<LabTypeModel>{
    id :0
  };
  //labTypes : LabTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  errorMessage:string;

  selection = new SelectionModel <LabTypeModel> (false, []);  
  labTypes: MatTableDataSource < LabTypeModel > ;  

  constructor(
    private _toastSrv : ToastService,
    private _labTypeService : LabTypeService
    ) {
  }
  ngOnInit() {
    this.GetLabTypes();
  }
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.labTypes && this.labTypes.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.labTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: LabTypeModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  ClearObject(){
    
    this.labType =<LabTypeModel>{
      id:0
    };
    this.GetLabTypes();
  }

  SaveLabType()
  {
    this.btnClicked=true;
    if(this.labType.id ==0){
      this._labTypeService.AddLabType(this.labType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetLabTypes();
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
      this._labTypeService.EditLabType(this.labType).subscribe((data : any) =>{
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

  GetLabTypes()
  {
    this._labTypeService.GetLabTypes().subscribe((data :any)=>{
       this.labTypes = data.result;
    })
  } 

  SelectCategoryToEdit(labType)
  {
    this.labType = labType;
  }

    SelectToEdit()
    {  const labType = this.selection.selected; 
      if (labType.length > 0) { 
      this.labType = labType[0];

       }
      else {  
              
                this._toastSrv.error("Failed","Select at least one row");
      
            }
    
    }
  DeleteType(id)
  {
      this._labTypeService.DeleteLabType(id).subscribe((data : any) =>{
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
  DeleteLapType()
  {
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._labTypeService.DeleteLabType(id).subscribe((data : any) =>{
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
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}

export interface LabTypeModel 
{
  id:number;
  name:string;
}


// pipe should be registered in app.module
@Pipe({
  name:'labTypeFilter'
})
export class labTypeFilterPipe implements PipeTransform{
  transform(contents : LabTypeModel[] , searchKey) : LabTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}