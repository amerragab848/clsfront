import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { YearVacationService } from 'src/app/core/services/year-vacation/year-vacation.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  //vacations : VacationModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <VacationModel> (false, []);  
  vacations: MatTableDataSource < VacationModel > ;  
  constructor(
    private datepipe: DatePipe,
    private _toastSrv : ToastService,
    private _vacationService : YearVacationService,
  ) { }

  ngOnInit() {
    this.GetVacation();
  }

//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.vacations && this.vacations.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: VacationModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
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
  DeleteVacationData()
  {
        const numSelected = this.selection.selected;  
       var id=numSelected[0].id;
       if (numSelected.length > 0) { 
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
       else {  
               
                 this._toastSrv.error("Failed","Select at least one row");
       
             }
     
  }
  SelectVacationToEdit(vacation)
  {
    this.vacation = vacation;
    this.vacation.startDate = this.datepipe.transform(vacation.startDate,'yyyy-MM-dd');
    this.vacation.endDate = this.datepipe.transform(vacation.endDate,'yyyy-MM-dd');
  }
  SelectVacationForEdit()
  {
    const vacation = this.selection.selected; 
    if (vacation.length > 0) { 
      this.vacation = vacation[0];
    
      this.vacation.startDate = this.datepipe.transform(this.vacation.startDate,'yyyy-MM-dd');
      this.vacation.endDate = this.datepipe.transform(this.vacation.endDate,'yyyy-MM-dd');
     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
  
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
