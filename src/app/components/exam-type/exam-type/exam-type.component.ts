import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import {ExamTypeService} from '../../../core/services/exam-type/exam-type.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import { from } from 'rxjs';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
@Component({
  selector: 'app-exam-type',
  templateUrl: './exam-type.component.html',
  styleUrls: ['./exam-type.component.css']
})
export class ExamTypeComponent implements OnInit {

  examType : ExamTypeModel =<ExamTypeModel>{
    id :0
  };
  //examTypes : ExamTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  errorMessage:string;
  selection = new SelectionModel <ExamTypeModel> (false, []);  
  examTypes: MatTableDataSource < ExamTypeModel > ;  

  constructor(
    private _toastSrv : ToastService,
    private _examTypeService : ExamTypeService
    ) {
  }
  ngOnInit() {
    this.GetExamTypes();
  }
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.examTypes && this.examTypes.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.examTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: ExamTypeModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  ClearObject(){
    
    this.examType =<ExamTypeModel>{
      id:0
    };
    this.GetExamTypes();
  }

  SaveExamType()
  {
    this.btnClicked=true;
    if(this.examType.id ==0){
      this._examTypeService.AddExamType(this.examType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetExamTypes();
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
      this._examTypeService.EditExamType(this.examType).subscribe((data : any) =>{
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

  GetExamTypes()
  {
    this._examTypeService.GetExamTypes().subscribe((data :any)=>{
       this.examTypes = data.result;
    })
  } 

   DeleteType(id)
  {
      this._examTypeService.DeleteExamType(id).subscribe((data : any) =>{
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
  DeleteExamType()
  {
    debugger;
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._examTypeService.DeleteExamType(id).subscribe((data : any) =>{
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

  SelectCategoryToEdit(examType)
  {
    this.examType = examType;
  }
  SelectToEdit()
  {
    const examType = this.selection.selected; 
    if (examType.length > 0) { 
    this.examType = examType[0];

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

export interface ExamTypeModel 
{
  id:number;
  name:string;
}


// pipe should be registered in app.module
@Pipe({
  name:'examTypeFilter'
})
export class examTypeFilterPipe implements PipeTransform{
  transform(contents : ExamTypeModel[] , searchKey) : ExamTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}