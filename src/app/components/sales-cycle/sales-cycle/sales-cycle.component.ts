import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { SalesCycleService } from 'src/app/core/services/sales-cycle/sales-cycle.service';
import { SalesCycleTypeService } from 'src/app/core/services/sales-cycle-type/sales-cycle-type.service';

export interface SalesCycleModel 
{
  id:number;
  name:string;
  percentage:number;
  salesCycleTypeId:number;
}

export interface SalesCycleTypeModel
{
  id:number;
  name:string;
}

@Component({
  selector: 'app-sales-cycle',
  templateUrl: './sales-cycle.component.html',
  styleUrls: ['./sales-cycle.component.css']
})
export class SalesCycleComponent implements OnInit {

  salesCycle : SalesCycleModel =<SalesCycleModel>{
    id :0
  };
  salesCycleType : SalesCycleModel =<SalesCycleModel>{
    id :0
  };

  salesCycles : SalesCycleModel[];
  salesCycleTypes : SalesCycleTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _SalesCycleService : SalesCycleService,
    private _SalesCycleTypeService : SalesCycleTypeService
  ) { }

  GetSalesCycles() {
    this._SalesCycleService.GetSalesCycle().subscribe((data :any)=>{
       this.salesCycles = data.result;
       console.log(this.salesCycles)
    }) 
  } 

  GetSalesCycleTypes()
  {
    this._SalesCycleTypeService.GetSalesCycleType().subscribe((data :any)=>{
       this.salesCycleTypes = data.result;
       console.log(this.salesCycleTypes)
    })
   
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.salesCycle =<SalesCycleModel>{
      id:0
    };
    this.GetSalesCycles();
  }

  SaveSalesCycle()
  {
    this.salesCycle.percentage = parseInt(this.salesCycle.percentage.toString());
    this.btnClicked=true;
    if(this.salesCycle.id ==0){
      this._SalesCycleService.AddSalesCycle(this.salesCycle).subscribe((data : any) =>{
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
      this._SalesCycleService.EditSalesCycle(this.salesCycle).subscribe((data : any) =>{
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

  SelectSalesCycleToEdit(salesCycle)
  {
    this.salesCycle = salesCycle;
  }

  DeleteSalesCycle(id) {
      this._SalesCycleService.DeleteSalesCycle(id).subscribe((data : any) =>{
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
    this.GetSalesCycles();
    this.GetSalesCycleTypes();
  }

}

@Pipe({
  name:'salesCycleFilter'
})
export class salesCycleFilterPipe implements PipeTransform{
  transform(contents : SalesCycleModel[] , searchKey) : SalesCycleModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
