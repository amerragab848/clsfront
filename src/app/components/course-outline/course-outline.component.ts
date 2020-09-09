import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CourseOutlineService } from 'src/app/core/services/course-outline/course-outline.service';
import { ActivatedRoute } from '@angular/router';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
import { Router, ParamMap } from '@angular/router';
export interface CourseOutlineModel 
{
  id:number;
  title:string;
  courseId:number;
}

@Component({
  selector: 'app-course-outline',
  templateUrl: './course-outline.component.html',
  styleUrls: ['./course-outline.component.css']
})
export class CourseOutlineComponent implements OnInit {

  courseOutline : CourseOutlineModel =<CourseOutlineModel>{
    id :0
  };

  //courseOutlines : CourseOutlineModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <CourseOutlineModel> (false, []);  
  courseOutlines: MatTableDataSource < CourseOutlineModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _courseOutlineService : CourseOutlineService,
    private activatedRoute: ActivatedRoute
  ) { }

  GetCourseOutlines() {
    this._courseOutlineService.GetCourseOutlines().subscribe((data :any)=>{
       this.courseOutlines = data.result.filter(o=> o.courseId == this.activatedRoute.snapshot.params.id);
    }) 
  } 
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.courseOutlines && this.courseOutlines.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: CourseOutlineModel): string {  
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
    this.courseOutline =<CourseOutlineModel>{
      id:0
    };
    this.GetCourseOutlines();
  }

  SaveCourseOutline()
  {
    let courseId = this.activatedRoute.snapshot.params.id;
    this.courseOutline.courseId = parseInt(courseId.toString());
    this.btnClicked=true;
    if(this.courseOutline.id ==0){
      this._courseOutlineService.AddCourseOutline(this.courseOutline).subscribe((data : any) =>{
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
      this._courseOutlineService.EditCourseOutline(this.courseOutline).subscribe((data : any) =>{
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

  SelectCourseOutlineToEdit(outline)
  {
    this.courseOutline = outline;
  }
  SelectCourseOutlineForEdit()
  {
    const outline = this.selection.selected; 
    if (outline.length > 0) { 
    this.courseOutline = outline[0];

     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
    
  }
  ngOnInit() {
    this.GetCourseOutlines()
  }

}

@Pipe({
  name:'courseOutlineFilter'
})
export class courseOutlineFilterPipe implements PipeTransform{
  transform(contents : CourseOutlineModel[] , searchKey) : CourseOutlineModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.title.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
