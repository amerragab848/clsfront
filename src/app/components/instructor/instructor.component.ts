import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { InstructorService } from 'src/app/core/services/instructor/instructor.service';
import { DomSanitizer } from '@angular/platform-browser';

export interface InstructorModel 
{
  id:number;
  name:string;
  phone:string;
  number:string;
  email:string;
  major:string;
  image:string;
  bio:string;
}

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

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
  }

  SaveInstructor()
  {
    this.btnClicked=true;
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
