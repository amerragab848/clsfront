import { Component, OnInit , Pipe , PipeTransform} from '@angular/core';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import {CourseService} from 'src/app/core/services/course/course.service';
import { CourseCategoryService } from 'src/app/core/services/course-category/course-category.service';
import { SubCategoryService } from 'src/app/core/services/sub-category/sub-category.service';
import {CourseTypeService} from '../../../core/services/course-type/course-type.service';
import { DeliveryTypeService } from 'src/app/core/services/deliver-type/delivery-type.service';
import {ExamTypeService} from '../../../core/services/exam-type/exam-type.service';
import {LabTypeService} from '../../../core/services/lab-type/lab-type.service';
import {MaterialTypeService} from '../../../core/services/material-type/material-type.service';
import {VendorService} from '../../../core/services/vendor/vendor.service';
import {LearningPathService} from '../../../core/services/learning-path/learning-path.service';

// Imports
let fileUpload = require('fuctbase64');

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course : CourseModel =<CourseModel>{
    id:0
  }
  courses : CourseModel[];
  materialTypes :MaterialTypeModel[];
  labTypes :LabTypeModel[];
  examTypes :ExamTypeModel[];
  deliveryTypes :DeliveryTypeModel[];
  courseCategories :CourseCategoryModel[];
  courseSubCategories :CourseCategoryModel[];
  courseTypes :CourseTypeModel[];
  vendors :VendorModel[];
  learningPaths:any[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _materialTypeSrv :MaterialTypeService,
    private _labTypeSrv :LabTypeService,
    private _examTypeSrv : ExamTypeService,
    private _deliveryTypeSrv:DeliveryTypeService,
    private _courseTypeSrv : CourseTypeService,
    private _courseCategorySrv : CourseCategoryService,
    private _courseService : CourseService,
    private _vendoerSrv :VendorService,
    private _toastSrv : ToastService,
    private _subCategorySrv : SubCategoryService,
    private _learningPathSrv : LearningPathService
    
      ) { }

  ngOnInit() {
    this.GetCourses();
    this.GetAllLockups();
  }

  GetCourses() {
    this._courseService.GetCoursees().subscribe((data :any)=>{
       this.courses = data.result;
    })
  } 
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
 
  ClearObject(){
    this.course =<CourseModel>{
      id:0
    };
    this.GetCourses();
    this.fileResult = null;
    this.fileInput = null;
  }

  fileResult: any = null;
  fileInput : any = null;
  async onFileChange(event){
    try {
      let result = await fileUpload(event);
      this.fileResult = result;
      console.log(this.fileResult);
    }
    catch{
      this.fileResult = null;
    }
}

  SaveCourse()
  {
    try{
      this.course.courseSubCategoryId =  parseInt(this.course.courseSubCategoryId.toString());
    }
    catch{
      this.course.courseSubCategoryId =  null;
    }
    this.course.courseCategoryId =  parseInt(this.course.courseCategoryId.toString());

    this.btnClicked=true;
    if(this.fileResult !=null)
    {
      this.course.base64File = this.fileResult.base64;
        this.course.fileName = this.fileResult.name
    }
    if(this.course.courseSubCategoryId  ==0)
    {
      this.course.courseSubCategoryId =null;
    }
    console.log(this.course);
    if(this.course.id ==0){
      this._courseService.AddCourse(this.course).subscribe((data : any) =>{
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
      this._courseService.EditCourse(this.course).subscribe((data : any) =>{
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

  SelectCourseToEdit(course)
  {
    this.course = course;
    console.log(course);
  }

  DeleteCourse(id)
  {
      this._courseService.DeleteCourse(id).subscribe((data : any) =>{
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


  // Get Lockups
  GetAllLockups()
  {
    this.GetCourseCategories();
    this.GetExamTypes();
    this.GetLabTypes();
    this.GetMaterialTypes();
    this.GetVendors();
    this.GetLearningPaths();
  }
  GetCourseCategories()
  {
    this._courseCategorySrv.GetCourseCategories().subscribe((data :any)=>{
      this.courseCategories = data.result;
   }) 
  }

  GetLearningPaths()
  {
    this._learningPathSrv.GetLearningPathes().subscribe((data :any)=>{
      this.learningPaths = data.result;
   }) 
  }
  
  GetSubCategories(id)
  {
    console.log(id);
    this._subCategorySrv.GetSubCategories().subscribe((data :any)=>{
      this.courseSubCategories = data.result.filter(c=> c.courseCategoryId ==id);
      console.log(this.courseSubCategories);
   }) 
  }
  GetExamTypes()
  {
    this._examTypeSrv.GetExamTypes().subscribe((data :any)=>{
      this.examTypes = data.result;
   }) 
  }
  GetLabTypes()
  {
    this._labTypeSrv.GetLabTypes().subscribe((data :any)=>{
      this.labTypes = data.result;
   }) 
  }
  GetMaterialTypes()
  {
    this._materialTypeSrv.GetMaterialTypes().subscribe((data :any)=>{
      this.materialTypes = data.result;
   }) 
  }
  GetVendors()
  {
    this._vendoerSrv.GetVendors().subscribe((data :any)=>{
      this.vendors = data.result;
   }) 
  }

}
export interface CourseCategoryModel
{
  id:number;
  name:string;
}
export interface CourseTypeModel
{
  id:number;
  name:string;
}
export interface DeliveryTypeModel
{
  id:number;
  name:string;
}
export interface ExamTypeModel
{
  id:number;
  name:string;
}
export interface LabTypeModel
{
  id:number;
  name:string;
}
export interface MaterialTypeModel
{
  id:number;
  name:string;
}
export interface VendorModel
{
  id:number;
  name:string;
}
export interface CourseModel 
{
  id:number;
  name:string;
  overview:string;
  outline:string;
  outcomes:string;
  benefits:string;
  courseCategoryId:number;
  courseSubCategoryId:number;
  examTypeId:number;
  materialTypeId:number;
  vendorId:number;
  labTypeId:number;
  learningPathId:number;
  learningPathName :string;
  courseCategoryName:string;
  courseSubCategoryName:string;
  examTypeName:string;
  materialTypeName:string;
  vendorName:string;
  labTypeName:string;
  prerequisites:string;
  audianceProfile:string;
  base64File:string;
  image:string;
  fileName:string;
  hoursDuration:number;
}


@Pipe({
  name:'courseFilter'
})
export class courseFilterPipe implements PipeTransform{
  transform(contents : CourseModel[] , searchKey) : CourseModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.courseCategoryName.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.examTypeName.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 ||  c.vendorName.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.materialTypeName.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 ||  c.courseSubCategoryName.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 );
  }
}
