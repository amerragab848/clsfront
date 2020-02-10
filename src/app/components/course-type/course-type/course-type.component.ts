import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import {CourseTypeService} from '../../../core/services/course-type/course-type.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})
export class CourseTypeComponent implements OnInit {

  courseType : CourseTypeModel =<CourseTypeModel>{
    id :0
  };
  courseTypes : CourseTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  errorMessage:string;


  constructor(
    private _toastSrv : ToastService,
    private _courseTypeService : CourseTypeService
    ) {
  }
  ngOnInit() {
    this.GetCourseTypes();
  }

  ClearObject(){
    
    this.courseType =<CourseTypeModel>{
      id:0
    };
    this.GetCourseTypes();
  }

  DeleteType(id)
  {
      this._courseTypeService.DeleteCourseType(id).subscribe((data : any) =>{
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


  SaveCourseType()
  {
    this.btnClicked=true;
    if(this.courseType.id ==0){
      this._courseTypeService.AddCourseType(this.courseType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetCourseTypes();
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
      this._courseTypeService.EditCourseType(this.courseType).subscribe((data : any) =>{
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

  GetCourseTypes()
  {
    this._courseTypeService.GetCourseTypes().subscribe((data :any)=>{
       this.courseTypes = data.result;
    })
  } 

  SelectCategoryToEdit(courseType)
  {
    this.courseType = courseType;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}

export interface CourseTypeModel 
{
  id:number;
  name:string;
}


// pipe should be registered in app.module
@Pipe({
  name:'courseTypeFilter'
})
export class courseTypeFilterPipe implements PipeTransform{
  transform(contents : CourseTypeModel[] , searchKey) : CourseTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}