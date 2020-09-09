import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { LearningPathService } from 'src/app/core/services/learning-path/learning-path.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
export interface LearningPathModel 
{
  id:number;
  name:string;
  info:string;
}

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {

  learningPath : LearningPathModel =<LearningPathModel>{
    id :0
  };
  selection = new SelectionModel <LearningPathModel> (false, []);  
  learningPathes: MatTableDataSource < LearningPathModel > ;  
  //learningPathes : LearningPathModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _learningPathService : LearningPathService
  ) { }
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.learningPathes && this.learningPathes.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() :this.selection.select(); //this.learningPathes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: LearningPathModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  GetLearningPathes()
  {
    this._learningPathService.GetLearningPathes().subscribe((data :any)=>{
       this.learningPathes = data.result;
       console.log(this.learningPathes) 
    })
   
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.learningPath =<LearningPathModel>{
      id:0
    };
    this.GetLearningPathes();
  }

  SaveLearningPath()
  {
    this.btnClicked=true;
    if(this.learningPath.id ==0){
      this._learningPathService.AddLearningPath(this.learningPath).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetLearningPathes();
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
      this._learningPathService.EditLearningPath(this.learningPath).subscribe((data : any) =>{
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
  SelectLearningPathForEdit()
  {
    debugger;
    const numSelected = this.selection.selected; 
    if (numSelected.length > 0) { 
    this.learningPath = numSelected[0];

     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
    
  }
  SelectLearningPathToEdit(learningPath)
  {
    this.learningPath = learningPath;
  }

  ngOnInit() {
    this.GetLearningPathes();
  }

}

@Pipe({
  name:'learningPathFilter'
})
export class learningPathFilterPipe implements PipeTransform{
  transform(contents : LearningPathModel[] , searchKey) : LearningPathModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
