import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { InstructorService } from 'src/app/core/services/instructor/instructor.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { CourseService } from 'src/app/core/services/course/course.service';

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
  selectedInsCourses = [];
  allCourses:any[];

  fileImageInput:any;
  fileImageResult: any = null;
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
  instructors : InstructorModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _instructorService : InstructorService,
    private _CourseService : CourseService,

  ) { }

  ngOnInit() {
    this.GetInstructors();
    this.GetAllCourses();
  }

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

 
  GetCourses(id)
  {
    this._instructorService.GetInstructorCourses(parseFloat(id)).subscribe((data :any)=>{
      this.courses = data.result;
   })
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
