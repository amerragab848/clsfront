import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import {ExamTypeService} from '../../../core/services/exam-type/exam-type.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-exam-type',
  templateUrl: './exam-type.component.html',
  styleUrls: ['./exam-type.component.css']
})
export class ExamTypeComponent implements OnInit {

  examType : ExamTypeModel =<ExamTypeModel>{
    id :0
  };
  examTypes : ExamTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  errorMessage:string;


  constructor(
    private _toastSrv : ToastService,
    private _examTypeService : ExamTypeService
    ) {
  }
  ngOnInit() {
    this.GetExamTypes();
  }

  ClearObject(){
    
    this.examType =<ExamTypeModel>{
      id:0
    };
    this.GetExamTypes();
  }

  SaveExamType()
  {
    this.btnClicked=true;
    if(this.examType.id ==0){
      this._examTypeService.AddExamType(this.examType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetExamTypes();
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
      this._examTypeService.EditExamType(this.examType).subscribe((data : any) =>{
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

  GetExamTypes()
  {
    this._examTypeService.GetExamTypes().subscribe((data :any)=>{
       this.examTypes = data.result;
    })
  } 

  SelectCategoryToEdit(examType)
  {
    this.examType = examType;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}

export interface ExamTypeModel 
{
  id:number;
  name:string;
}


// pipe should be registered in app.module
@Pipe({
  name:'examTypeFilter'
})
export class examTypeFilterPipe implements PipeTransform{
  transform(contents : ExamTypeModel[] , searchKey) : ExamTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}