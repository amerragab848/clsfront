import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { SalesCycleTypeService } from 'src/app/core/services/sales-cycle-type/sales-cycle-type.service';

export interface SalesCycleTypeModel 
{
  id:number;
  name:string;
}

@Component({
  selector: 'app-sales-cycle-type',
  templateUrl: './sales-cycle-type.component.html',
  styleUrls: ['./sales-cycle-type.component.css']
})
export class SalesCycleTypeComponent implements OnInit {

  salesCycleType : SalesCycleTypeModel =<SalesCycleTypeModel>{
    id :0
  };

  salesCycleTypes : SalesCycleTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _salesCycleTypeService : SalesCycleTypeService
  ) { }

  GetSalesCycleTypes() {
    this._salesCycleTypeService.GetSalesCycleType().subscribe((data :any)=>{
       this.salesCycleTypes = data.result;
       console.log(this.salesCycleTypes);
    });
   
  } 

  ngOnInit() {
    this.GetSalesCycleTypes();
  }

}
