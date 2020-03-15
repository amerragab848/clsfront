import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { YearVacationService } from 'src/app/core/services/year-vacation/year-vacation.service';

export interface VacationModel 
{
  id:number;
  name:string;
  startDate:string;
  endDate:string;
}

@Component({
  selector: 'app-year-vacation',
  templateUrl: './year-vacation.component.html',
  styleUrls: ['./year-vacation.component.css']
})
export class YearVacationComponent implements OnInit {

  vacation : VacationModel =<VacationModel>{
    id :0
  };

  vacations : VacationModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private datepipe: DatePipe,
    private _toastSrv : ToastService,
    private _vacationService : YearVacationService,
  ) { }

  ngOnInit() {
    this.GetVacation();
  }


  GetVacation() {
    this._vacationService.GetVacation().subscribe((data :any)=>{
      console.log(data);
       this.vacations = data.result;
       console.log(this.vacations);  
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.vacation =<VacationModel>{
      id:0
    };
    this.GetVacation();
  }

  SaveVacation()
  {
    this.btnClicked=true;
    if(this.vacation.id ==0){
      this._vacationService.AddVacation(this.vacation).subscribe((data : any) =>{
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
      this._vacationService.EditVacation(this.vacation).subscribe((data : any) =>{
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

  DeleteVacation(id)
  {
      this._vacationService.DeleteVacation(id).subscribe((data : any) =>{
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

  SelectVacationToEdit(vacation)
  {
    this.vacation = vacation;
    this.vacation.startDate = this.datepipe.transform(vacation.startDate,'yyyy-MM-dd');
    this.vacation.endDate = this.datepipe.transform(vacation.endDate,'yyyy-MM-dd');
  }



}

@Pipe({
  name:'yearVacationFilter'
})
export class yearVacationFilterPipe implements PipeTransform{
  transform(contents : VacationModel[] , searchKey) : VacationModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.startDate.toString().toLowerCase().indexOf(searchKey.toLowerCase()) !==-1 || c.endDate.toString().toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
