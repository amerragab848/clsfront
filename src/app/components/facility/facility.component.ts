import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { FacilityService } from 'src/app/core/services/facility/facility.service';
import { ActivatedRoute } from '@angular/router';
import { LabService } from 'src/app/core/services/lab/lab.service';
import {BranchService} from 'src/app/core/services/branch/branch.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
export interface FacilityModel 
{
  id:number;
  name:string;
  number:number;
  info:string;
  labId:number;
}

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {

  facility : FacilityModel =<FacilityModel>{
    id :0
  };

 // facilities : FacilityModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  labs : any[];
  branches : any[];
  selection = new SelectionModel <FacilityModel> (false, []);  
  facilities: MatTableDataSource < FacilityModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _facilityService : FacilityService,
    private activatedRoute: ActivatedRoute,
    private _branchSrv : BranchService,
    private _labService : LabService
  ) { }
  ngOnInit() {
    this.GetFacilities();
    this.GetBranches();
  }
  
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.facilities && this.facilities.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: FacilityModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//

  GetFacilities() {
    this._facilityService.GetFacilities().subscribe((data :any)=>{
       this.facilities = data.result.filter(f=>f.labId == this.activatedRoute.snapshot.params.id );
    }) 
  } 
  GetBranches() {
    this._branchSrv.GetBranches().subscribe((data :any)=>{
       this.branches = data.result;
    }); 
  }
  GetLabs(id) {
    this._labService.GetLabs().subscribe((data :any)=>{
       this.labs = data.result.filter(l=> l.branchId == id);
    }); 
  } 
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.facility =<FacilityModel>{
      id:0
    };
    this.GetFacilities();
  }

  SaveFacility()
  {
    let labId = this.activatedRoute.snapshot.params.id;
    this.facility.labId = parseInt(labId.toString());
    this.facility.number = parseInt(this.facility.number.toString());
    this.btnClicked=true;
    if(this.facility.id ==0){
      this._facilityService.AddFacility(this.facility).subscribe((data : any) =>{
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
      this._facilityService.EditFacility(this.facility).subscribe((data : any) =>{
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

  SelectFacilityToEdit(facility)
  {
    this.facility = facility;
  }
  SelectFacilityForEdit()
  {
            const facility = this.selection.selected; 
            if (facility.length > 0) { 
              this.facility = facility[0]; 
             }
      else {  
        
          this._toastSrv.error("Failed","Select at least one row");

      }
    				
  }
  DeleteFacility(id)
  {
      this._facilityService.DeleteFacility(id).subscribe((data : any) =>{
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
  DeleteFacilityData()
  {
      const numSelected = this.selection.selected;  
       var id=numSelected[0].id;
       if (numSelected.length > 0) {
        this._facilityService.DeleteFacility(id).subscribe((data : any) =>{
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
  selectedFacilityId : any;
  selectedFacilityLabId:any;
  selectedFacilityNumber:any;
  labId:any;
  transNumber:any;

  OpenTransferPopUp(id,labId,number){
    this.selectedFacilityId = id;
    this.selectedFacilityLabId = labId;
    this.selectedFacilityNumber = number;
  }
  OpenTransferPopUpData(){
    const numSelected = this.selection.selected;  
    var id=numSelected[0].id;
    var labId=numSelected[0].labId;
    var number=numSelected[0].number;

   
 if (numSelected.length > 0) { 
  this.selectedFacilityId = id;
  this.selectedFacilityLabId = labId;
  this.selectedFacilityNumber = number;

  }
else {  
        
          this._toastSrv.error("Failed","Select at least one row");

      }
    
  }
  Transfer(){
    if(this.transNumber > this.selectedFacilityNumber)
    {
      alert("Transfer Number is More Than Facility Number");
      return;
    }
    if(this.selectedFacilityLabId ==this.labId )
    {
      alert("You Can't Transfer to Same Lab");
      return;
    }
    this._facilityService.Transfer(this.selectedFacilityId,parseFloat(this.labId),parseFloat(this.transNumber)).subscribe((data :any)=>{
      if(data.result == "200")
      {
        this._toastSrv.success("Success","");
        this.GetFacilities();
      }
   }); 
  }

}



@Pipe({
  name:'facilityFilter'
})
export class facilityFilterPipe implements PipeTransform{
  transform(contents : FacilityModel[] , searchKey) : FacilityModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
