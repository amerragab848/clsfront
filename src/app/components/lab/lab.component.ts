import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { LabService } from 'src/app/core/services/lab/lab.service';
import { BranchService } from 'src/app/core/services/branch/branch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
export interface LabModel 
{
  id:number;
  name:string;
  capacity:number;
  branchId:number;
  branchName:string;
}

export interface BranchModel 
{
  id:number;
  name:string;
}

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  lab : LabModel =<LabModel>{
    id :0
  };
  branch : LabModel =<LabModel>{
    id :0
  };

  //labs : LabModel[];
  branches : BranchModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <LabModel> (false, []);  
  labs: MatTableDataSource < LabModel > ;  
  constructor(
    private route: Router,
    private _toastSrv : ToastService,
    private _labService : LabService,
    private _branchService : BranchService
  ) { }

  
  GetLabs() {
    this._labService.GetLabs().subscribe((data :any)=>{
       this.labs = data.result;
    }) 
  } 

  GetBranches() {
    this._branchService.GetBranches().subscribe((data :any)=>{
       this.branches = data.result;
    }) 
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.lab =<LabModel>{
      id:0
    };
    this.GetLabs();
  }
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.labs && this.labs.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() :this.selection.select();//this.labs.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: LabModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
  SaveLab()
  {
    this.btnClicked=true;
    if(this.lab.id ==0){
      this._labService.AddLab(this.lab).subscribe((data : any) =>{
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
      this._labService.EditLab(this.lab).subscribe((data : any) =>{
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

  SelectLabToEdit(lab)
  {
    this.lab = lab;
  }
  SelectLabForEdit()
  {
            const lab = this.selection.selected; 
            if (lab.length > 0) { 
    				this.lab = lab[0];

             }
            else {  
                    
                      this._toastSrv.error("Failed","Select at least one row");
            
                  }
   
  }
  DeleteLab(id)
  {
      this._labService.DeleteLab(id).subscribe((data : any) =>{
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
  DeleteLabData()
  {
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    if (numSelected.length > 0) { 
      this._labService.DeleteLab(id).subscribe((data : any) =>{
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
  GotoFacility(){
    this.ClearObject();
    const numSelected = this.selection.selected; 
    
    this.lab = numSelected[0];
    if (numSelected.length > 0) {
    this.route.navigate(['/app/facility',this.lab.id]);

      }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
   // this.route.navigate(['/app/rounds', { id : this.course.id }]);
  // [routerLink]="['/app/facility', lab.id]"
  }
  ngOnInit() {
    this.GetLabs();
    this.GetBranches();
  }

}

@Pipe({
  name:'labFilter'
})
export class labFilterPipe implements PipeTransform{
  transform(contents : LabModel[] , searchKey) : LabModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1  || c.branchName.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
