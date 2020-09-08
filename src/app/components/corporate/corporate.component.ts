import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CorporateService } from 'src/app/core/services/corporate/corporate.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
export interface CorporateModel 
{
  id:number;
  name: string;
  fax: string;
  email: string;
  contactPersonEmail: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.css']
})
export class CorporateComponent implements OnInit {

  corporate : CorporateModel =<CorporateModel>{
    id :0
  };

 // corporates : CorporateModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <CorporateModel> (false, []);  
  corporates: MatTableDataSource < CorporateModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _corporateService : CorporateService
  ) { }

  GetCorporates() {
    this._corporateService.GetCorporates().subscribe((data :any)=>{
       this.corporates = data.result;
       console.log(this.corporates)
    })
  } 
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.corporates && this.corporates.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: CorporateModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.corporate =<CorporateModel>{
      id:0
    };
    this.GetCorporates();
  }

  SaveCorporate()
  {
    this.btnClicked=true;
    if(this.corporate.id ==0){
      this._corporateService.AddCorporate(this.corporate).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetCorporates();
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
      this._corporateService.EditCorporate(this.corporate).subscribe((data : any) =>{
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

  SelectCorporateToEdit(corporate)
  {
    this.corporate = corporate;
  }
  SelectCorporateForEdit()
  {
    const corporate = this.selection.selected; 
    this.corporate = corporate[0];
    
  }
  DeleteCorporaet(id)
  {
      this._corporateService.DeleteCorporate(id).subscribe((data : any) =>{
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
  DeleteCorporaetData()
  {
      const numSelected = this.selection.selected;  
       var id=numSelected[0].id;
      this._corporateService.DeleteCorporate(id).subscribe((data : any) =>{
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
  ngOnInit() {
    this.GetCorporates();
  }

}

@Pipe({
  name:'corporateFilter'
})
export class corporateFilterPipe implements PipeTransform{
  transform(contents : CorporateModel[] , searchKey) : CorporateModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
