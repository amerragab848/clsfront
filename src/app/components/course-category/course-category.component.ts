import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CourseCategoryService } from 'src/app/core/services/course-category/course-category.service';

export interface CourseCategoryModel 
{
  id:number;
  name:string;
}

export interface APIWrapper
{
  result:CourseCategoryModel[];
}
@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  courseCategory : CourseCategoryModel =<CourseCategoryModel>{
    id :0
  };

  courseCategories : CourseCategoryModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _courseCategoryService : CourseCategoryService
  ) { }

  GetCourseCategories()
  {
    this._courseCategoryService.GetCourseCategories().subscribe((data :APIWrapper)=>{
       this.courseCategories = data.result;
    })
   
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.courseCategory =<CourseCategoryModel>{
      id:0
    };
    this.GetCourseCategories();
  }

  SaveCourseCategory()
  {
    this.btnClicked=true;
    if(this.courseCategory.id ==0){
      this._courseCategoryService.AddCourseCategory(this.courseCategory).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetCourseCategories();
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
      this._courseCategoryService.EditCourseCategory(this.courseCategory).subscribe((data : any) =>{
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

  DeleteCategory(id)
  {
      this._courseCategoryService.DeleteCategory(id).subscribe((data : any) =>{
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

  SelectCategoryToEdit(courseCategory)
  {
    this.courseCategory = courseCategory;
  }

  ngOnInit() {
    this.GetCourseCategories();
  }

}

@Pipe({
  name:'courseCategoryFilter'
})
export class courseCategoryFilterPipe implements PipeTransform{
  transform(contents : CourseCategoryModel[] , searchKey) : CourseCategoryModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
