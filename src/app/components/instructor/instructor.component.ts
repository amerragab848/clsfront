import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { InstructorService } from 'src/app/core/services/instructor/instructor.service';
import { DomSanitizer } from '@angular/platform-browser';
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
}

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
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

  instructors : InstructorModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _instructorService : InstructorService,
  ) { }

  GetInstructors() {
    this._instructorService.GetInstructors().subscribe((data :any)=>{
       this.instructors = data.result;
       console.log(this.instructors)
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
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
    this.instructor = instructor;
  }

  ngOnInit() {
    this.GetInstructors();
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
