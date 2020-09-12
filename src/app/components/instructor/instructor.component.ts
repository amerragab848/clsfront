import { Component, OnInit, Pipe, PipeTransform,Inject  } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { InstructorService } from 'src/app/core/services/instructor/instructor.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { CourseService } from 'src/app/core/services/course/course.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
import { DOCUMENT } from '@angular/common';
import { CourseModel } from '../course/course/course.component';
import { CommonService } from 'src/app/core/services/common-service';
let fileUpload = require('fuctbase64');
export interface InstructorModel 
{
  id:number;
  name:string;
  phone:string;
  number:string;
  email:string;
  major:string;
  bio:string;
  image:string;
  base64File:string;
  fileName:string;
  grade:string;
  company:string;
  tranningCenter:string;
  cvPath:string;
  cvBase64:string;
  cvFileName:string;
  nationalIdPath:string;
  nationalIdBase64:string;
  nationalIdFileName:string;
  internalRate:string;
  bloackReason : string;
  courses:string;
  state:string;
}

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  
  insCourses : any[];
  selectedInsCourses =[];
  selectedCourse:any ;
  allCourses:any[];
  selection = new SelectionModel <InstructorModel> (false, []);  
  instructors: MatTableDataSource < InstructorModel > ;  
  fileImageInput:any;
  fileImageResult: any = null;
  //added
  selectedValue: any;
  multiple = true;

  async onFileImageChange(event){
    try {
      let result = await fileUpload(event);
      this.fileImageResult = result;
    }
    catch{
      this.fileImageResult = null;
    }
  }
  fileCVInput:any;
  fileCVResult: any = null;
  async onFileCVChange(event){
    try {
      let result = await fileUpload(event);
      this.fileCVResult = result;
    }
    catch{
      this.fileCVResult = null;
    }
  }
  fileNationalIdInput:any;
  fileNationalIdResult: any = null;
  async onFileNationalIdChange(event){
    try {
      let result = await fileUpload(event);
      this.fileNationalIdResult = result;
    }
    catch{
      this.fileNationalIdResult = null;
    }
  }
  instructor : InstructorModel =<InstructorModel>{
    id :0
  };
  courses : any[];
  //instructors : InstructorModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _toastSrv : ToastService,
    private _instructorService : InstructorService,
    private _CourseService : CourseService,
    private commonService: CommonService

  ) { }

  ngOnInit() {
    this.GetInstructors();
    this.GetAllCourses();
  }
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.instructors && this.instructors.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() :this.instructors.data.forEach(r => this.selection.select(r));
    const crsCategory = this.selection.selected;  
    this.instructor=crsCategory[0];

} 
selectChange() {
  if (this.multiple) {
    this.selectedValue = this.commonService.getDropDownText(this.selectedInsCourses, this.allCourses);
  } else {
    this.selectedValue = this.commonService.getDropDownText(this.selectedInsCourses, this.allCourses)[0].name;
  }
}
onSelect(courseSelected: any ): void {
  this.selectedCourse = courseSelected;
} 
fillData(){
  const crsCategory = this.selection.selected;  
    this.instructor=crsCategory[0];
}
fillDataCV(){
  this.ClearObject();
  const crsCategory = this.selection.selected;  
    this.instructor=crsCategory[0];
}
/** The label for the checkbox on the passed row */  
checkboxLabel(row: InstructorModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  GetInstructors() {
    this._instructorService.GetInstructors().subscribe((data :any)=>{
       this.instructors = data.result;
       console.log(this.instructors)
    })
  } 
  GetAllCourses() {
    this._CourseService.GetCoursees().subscribe((data :any)=>{
       this.allCourses = data.result;
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
  goToNationalIdPath(): void {
    this.document.location.href = ' href="http://clslearn.net';{this.instructor.nationalIdPath}'"';
    
}
  OpenInstRates(id,instructor)
  {
    try{
      if(instructor.courses.length > 0)
      {
        var arr = instructor.courses.toString().split(',');
          var tempArr = [];
          arr.forEach(element => {
            tempArr.push(parseInt(element));
          });
          this.selectedInsCourses = tempArr;
      }
    }
    catch{
      //Ignore
    }
    this.rateInstId =id;
    this.GetInstRates(id);
    this.rateInstCourses = this.allCourses.filter(x=> this.selectedInsCourses.includes(x.id));
    console.log(this.rateInstCourses);
  }
  OpenInstRatesData()
  {
    const numSelected = this.selection.selected;  
      var id=numSelected[0].id;
      if (numSelected.length > 0) {  try{
      
        if(numSelected[0].courses.length > 0)
        {
          var arr = numSelected[0].courses.toString().split(',');
            var tempArr = [];
            arr.forEach(element => {
              tempArr.push(parseInt(element));
            });
            this.selectedInsCourses = tempArr;
        }
      }
      catch{
        //Ignore
      }
      this.rateInstId =id;
      this.GetInstRates(id);
      this.rateInstCourses = this.allCourses.filter(x=> this.selectedInsCourses.includes(x.id));
      console.log(this.rateInstCourses); }
      else {  
              
                this._toastSrv.error("Failed","Select at least one row");
      
            }
   
  }
  rateInstCourses: any[];
  rateInstId : number;
  rateEGP:number ;
  rateUSD:number;
  rateCourseName:string = '';
  instRates:any[];
  GetInstRates(id)
  {
    this._instructorService.GetInstructorRates(parseFloat(id)).subscribe((data :any)=>{
      this.instRates = data.result;
      this.rateInstId = id;
   })
  }
  SaveInstructorRate()
  {
    this._instructorService.SaveInstructorRate({
      courseName:this.rateCourseName,
      rateEGP:this.rateEGP.toString(),
      rateUSD:this.rateUSD.toString(),
      instructorId: parseFloat(this.rateInstId.toString())
    }).subscribe((data : any) =>{
      if(data.code === 200){
        this.GetInstRates(this.rateInstId);
        this._toastSrv.success("","Saved Successfully");
        this.rateCourseName = "";
        this.rateEGP=null;
        this.rateUSD=null;

      }
      if(data.code === 500)
      {
        this._toastSrv.error("Failed",data.message);
      }
    },
    (error) =>{
      console.log(error);
    }
    );
  }
  DeleteRate(id)
  {
    this._instructorService.DeleteInstructorRates(parseFloat(id)).subscribe((data :any)=>{
      this.GetInstRates(this.rateInstId);
   })
  }
  ClearObject(){
    this.instructor =<InstructorModel>{
      id:0
    };
    this.GetInstructors();
    this.fileImageResult = null;
    this.fileImageInput = null;
    this.fileCVInput = null;
    this.fileNationalIdInput = null;
    this.selectedInsCourses = [];
  }

  SaveInstructor()
  {
    this.btnClicked=true;
    if(this.fileImageResult !=null)
    {
      this.instructor.base64File = this.fileImageResult.base64;
        this.instructor.fileName = this.fileImageResult.name
    }
    if(this.fileNationalIdResult !=null)
    {
      this.instructor.nationalIdBase64 = this.fileNationalIdResult.base64;
        this.instructor.nationalIdFileName = this.fileNationalIdResult.name
    }
    if(this.fileCVResult !=null)
    {
      this.instructor.cvBase64 = this.fileCVResult.base64;
        this.instructor.cvFileName = this.fileCVResult.name
    }
    console.log(this.instructor);
    this.instructor.courses = this.selectedInsCourses.toString();
    if(this.instructor.id ==0){
      this._instructorService.AddInstructor(this.instructor).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetInstructors();
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
      this._instructorService.EditInstructor(this.instructor).subscribe((data : any) =>{
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

  SelectInstructorToEdit(instructor)
  {
    console.log(instructor);
    try{
      if(instructor.courses.length > 0)
      {
        var arr = instructor.courses.toString().split(',');
          var tempArr = [];
          arr.forEach(element => {
            tempArr.push(parseInt(element));
          });
          this.selectedInsCourses = tempArr;
          console.log( this.selectedInsCourses );
      }
    }
    catch{
      //Ignore
    }
    this.instructor = instructor;
  }

  EditInstructor()
  {
    debugger;
    const numSelected = this.selection.selected; 
    console.log(numSelected);
    if (numSelected.length > 0) { 
      try{
        if(numSelected[0].courses.length > 0)
        {
          var arr = numSelected[0].courses.toString().split(',');
            var tempArr = [];
            arr.forEach(element => {
              tempArr.push(parseInt(element));
            });
            this.selectedInsCourses = tempArr;

            if (this.multiple) {
              this.selectedValue = this.commonService.getDropDownText(this.selectedInsCourses, this.allCourses);
            } else {
              this.selectedValue = this.commonService.getDropDownText(this.selectedInsCourses, this.allCourses)[0].name;
            }
            console.log( this.selectedInsCourses );
        }
      }
      catch{
        //Ignore
      }
      this.instructor = numSelected[0];
     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
   
  }
  
  DeleteInstructor(id)
  {
    this._instructorService.DeleteInstructor(id).subscribe((data : any) =>{
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
  GetCourses(id)
  {
    this._instructorService.GetInstructorCourses(parseFloat(id)).subscribe((data :any)=>{
      this.courses = data.result;
   })
  }
  GetCoursesData()
  {
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._instructorService.GetInstructorCourses(id).subscribe((data :any)=>{
        this.courses = data.result;
     })
     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
   
  }
  DeleteSelectedInstructor()
  {
    debugger;
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._instructorService.DeleteInstructor(id).subscribe((data : any) =>{
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
  name:'instructorFilter'
})
export class instructorFilterPipe implements PipeTransform{
  transform(contents : InstructorModel[] , searchKey) : InstructorModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.number.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.phone.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.email.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
