import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import {VendorService} from '../../../core/services/vendor/vendor.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendor : VendorModel =<VendorModel>{
    id :0
  };
  vendors : VendorModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  errorMessage:string;


  constructor(
    private _toastSrv : ToastService,
    private _vendorService : VendorService
    ) {
  }
  ngOnInit() {
    this.GetVendors();
  }

  ClearObject(){
    
    this.vendor =<VendorModel>{
      id:0
    };
    this.GetVendors();
  }

  SaveVendor()
  {
    this.btnClicked=true;
    if(this.vendor.id ==0){
      this._vendorService.AddVendor(this.vendor).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetVendors();
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
        // if(error.error.code === 500){
        //   this.toastr.error("",error.error.responseException.exceptionMessage);
        //   this.btnClicked=false;
        // }
        this.btnClicked=false;
        console.log(error);
      }
      );
    }
    else{
      this._vendorService.EditVendor(this.vendor).subscribe((data : any) =>{
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
          // this.toastr.error("",error.error.responseException.exceptionMessage);
          this.btnClicked=false;
        }
      }
      );
    }
  }

  GetVendors()
  {
    this._vendorService.GetVendors().subscribe((data :any)=>{
       this.vendors = data.result;
    })
  } 

  SelectCategoryToEdit(vendor)
  {
    this.vendor = vendor;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}

export interface VendorModel 
{
  id:number;
  name:string;
}


// pipe should be registered in app.module
@Pipe({
  name:'vendorFilter'
})
export class vendorFilterPipe implements PipeTransform{
  transform(contents : VendorModel[] , searchKey) : VendorModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}