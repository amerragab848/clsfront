import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.salesCycleType =<SalesCycleTypeModel>{
      id:0
    };
    this.GetSalesCycleTypes();
  }

  SaveSalesCycleType()
  {
    this.btnClicked=true;
    if(this.salesCycleType.id ==0){
      this._salesCycleTypeService.AddSalesCycleType(this.salesCycleType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetSalesCycleTypes();
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
      this._salesCycleTypeService.EditSalesCycleType(this.salesCycleType).subscribe((data : any) =>{
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

  DeleteSalesCycleType(id)
  {
      this._salesCycleTypeService.DeleteSalesCycleType(id).subscribe((data : any) =>{
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

  SelectSalesCycleTypeToEdit(salesCycleType)
  {
    this.salesCycleType = salesCycleType;
  }

  ngOnInit() {
    this.GetSalesCycleTypes();
  }

}

@Pipe({
  name:'salesCycleTypeFilter'
})
export class salesCycleTypeFilterPipe implements PipeTransform{
  transform(contents : SalesCycleTypeModel[] , searchKey) : SalesCycleTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
