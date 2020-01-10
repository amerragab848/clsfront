import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch/branch.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

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

  branches : BranchModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _branchService : BranchService
  ) { }

  GetBranches() {
    this._branchService.GetBranches().subscribe((data :any)=>{
       this.branches = data.result;
    })
  } 

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
