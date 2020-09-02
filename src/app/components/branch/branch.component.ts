import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch/branch.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
export interface BranchModel 
{
  id:number;
  name:string;
  location:string;
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  branch : BranchModel =<BranchModel>{
    id :0
  };

 // branches : BranchModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <BranchModel> (false, []);  
  branches: MatTableDataSource < BranchModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _branchService : BranchService
  ) { }

  GetBranches() {
    this._branchService.GetBranches().subscribe((data :any)=>{
       this.branches = data.result;
    })
  } 
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.branches && this.branches.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() :this.selection.select();// this.branches.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: BranchModel): string {  
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
    this.branch =<BranchModel>{
      id:0
    };
    this.GetBranches();
  }

  SaveBranch()
  {
    this.btnClicked=true;
    if(this.branch.id ==0){
      this._branchService.AddBranch(this.branch).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetBranches();
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
      this._branchService.EditBranch(this.branch).subscribe((data : any) =>{
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

  SelectBranchToEdit(branch)
  {
    this.branch = branch;
  }
  SelectBranchForEdit()
  {
    
    const branch = this.selection.selected; 
    this.branch = branch[0];
    
  }
  DeleteBranch(id)
  {
      this._branchService.DeleteBranch(id).subscribe((data : any) =>{
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
  DeleteBranchData()
  {
    debugger;
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
      this._branchService.DeleteBranch(id).subscribe((data : any) =>{
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
    this.GetBranches();
  }

}

@Pipe({
  name:'branchFilter'
})
export class branchFilterPipe implements PipeTransform{
  transform(contents : BranchModel[] , searchKey) : BranchModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
