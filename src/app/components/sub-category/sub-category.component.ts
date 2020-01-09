import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { SubCategoryService } from 'src/app/core/services/sub-category/sub-category.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CourseCategoryService } from 'src/app/core/services/course-category/course-category.service';

export interface SubCategoryModel 
{
  id:number;
  name:string;
  courseCategoryName:string;
  courseCategoryId:number;
}

export interface CourseCategoryModel 
{
  id:number;
  name:string;
}

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  subCategory : SubCategoryModel =<SubCategoryModel>{
    id :0
  };
  category : SubCategoryModel =<SubCategoryModel>{
    id :0
  };

  subCategories : SubCategoryModel[];
  courseCategories : CourseCategoryModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _SubCategoryService : SubCategoryService,
    private _courseCategoryService : CourseCategoryService
  ) { }

  GetSubCategories() {
    this._SubCategoryService.GetSubCategories().subscribe((data :any)=>{
       this.subCategories = data.result;
    }) 
  } 

  GetCourseCategories()
  {
    this._courseCategoryService.GetCourseCategories().subscribe((data :any)=>{
       this.courseCategories = data.result;
    })
   
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.subCategory =<SubCategoryModel>{
      id:0
    };
    this.GetSubCategories();
  }

  SaveSubCategory()
  {
    this.btnClicked=true;
    if(this.subCategory.id ==0){
      this._SubCategoryService.AddSubCategory(this.subCategory).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetSubCategories();
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
      this._SubCategoryService.EditSubCategory(this.subCategory).subscribe((data : any) =>{
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

  SelectSubCategoryToEdit(subCategory)
  {
    this.subCategory = subCategory;
  }

  ngOnInit() {
    this.GetSubCategories();
    this.GetCourseCategories();
  }

}

@Pipe({
  name:'subCategoryFilter'
})
export class subCategoryFilterPipe implements PipeTransform{
  transform(contents : SubCategoryModel[] , searchKey) : SubCategoryModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
