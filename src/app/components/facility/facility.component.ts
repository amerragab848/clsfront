import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { FacilityService } from 'src/app/core/services/facility/facility.service';
import { ActivatedRoute } from '@angular/router';

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

  facilities : FacilityModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _facilityService : FacilityService,
    private activatedRoute: ActivatedRoute
  ) { }

  GetFacilities() {
    this._facilityService.GetFacilities().subscribe((data :any)=>{
       this.facilities = data.result;
    }) 
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
    parseInt(this.facility.number.toString());
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

  ngOnInit() {
    this.GetFacilities();
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
