import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { SubCategoryService } from 'src/app/core/services/sub-category/sub-category.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CourseCategoryService } from 'src/app/core/services/course-category/course-category.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
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

  //subCategories : SubCategoryModel[];
  courseCategories : CourseCategoryModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  selection = new SelectionModel <SubCategoryModel> (false, []);  
  subCategories: MatTableDataSource < SubCategoryModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _SubCategoryService : SubCategoryService,
    private _courseCategoryService : CourseCategoryService
  ) { }

  ngOnInit() {
    this.GetSubCategories();
    this.GetCourseCategories();
  }

  GetSubCategories() {
    this._SubCategoryService.GetSubCategories().subscribe((data :any)=>{
       this.subCategories = data.result;
    }) 
  } 
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.subCategories && this.subCategories.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() :this.selection.select();// this.subCategories.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: SubCategoryModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
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
  SelectSubCategoryForEdit()
  {
    const subCategory = this.selection.selected; 
    if (subCategory.length > 0) { 
      this.subCategory = subCategory[0];

     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
    
  }
  DeleteSubCategory(id)
  {
      this._SubCategoryService.DeleteCourseSubCategory(id).subscribe((data : any) =>{
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
  DeleteCategory()
  {
      const numSelected = this.selection.selected;  
      var id=numSelected[0].id;
      if (numSelected.length > 0) { 
        this._SubCategoryService.DeleteCourseSubCategory(id).subscribe((data : any) =>{
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
}

@Pipe({
  name:'subCategoryFilter'
})
export class subCategoryFilterPipe implements PipeTransform{
  transform(contents : SubCategoryModel[] , searchKey) : SubCategoryModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1  || c.courseCategoryName.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
