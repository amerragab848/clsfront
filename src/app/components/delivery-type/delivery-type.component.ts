import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { DeliveryTypeService } from 'src/app/core/services/deliver-type/delivery-type.service';

export interface DeliveryTypeModel 
{
  id:number;
  name:string;
}

@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.component.html',
  styleUrls: ['./delivery-type.component.css']
})
export class DeliveryTypeComponent implements OnInit {

  deliveryType : DeliveryTypeModel =<DeliveryTypeModel>{
    id :0
  };

  deliveryTypes : DeliveryTypeModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _deliveryTypeService : DeliveryTypeService
  ) { }

  GetDeliveryTypes()
  {
    this._deliveryTypeService.GetDeliveryTypes().subscribe((data :any)=>{
       this.deliveryTypes = data.result;
       console.log(this.deliveryType);
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.deliveryType =<DeliveryTypeModel>{
      id:0
    };
    this.GetDeliveryTypes();
  }

  SaveDeliveryType()
  {
    this.btnClicked=true;
    if(this.deliveryType.id ==0){
      this._deliveryTypeService.AddDeliveryType(this.deliveryType).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetDeliveryTypes();
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
      this._deliveryTypeService.EditDeliveryType(this.deliveryType).subscribe((data : any) =>{
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

   DeleteType(id)
  {
      this._deliveryTypeService.DeleteDeliveryType(id).subscribe((data : any) =>{
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

  SelectTypeToEdit(deliveryType)
  {
    this.deliveryType = deliveryType;
  }

  ngOnInit() {
    this.GetDeliveryTypes();
  }

}

@Pipe({
  name:'deliveryTypeFilter'
})
export class deliveryTypeFilterPipe implements PipeTransform{
  transform(contents : DeliveryTypeModel[] , searchKey) : DeliveryTypeModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
