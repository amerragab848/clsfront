import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import {VendorService} from '../../../core/services/vendor/vendor.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import { from } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CourseCategoryService } from 'src/app/core/services/course-category/course-category.service';
// Imports
let fileUpload = require('fuctbase64');

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  categories : any[];
  selectedCategories = [];


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
    private _vendorService : VendorService,
    private _categoreisService : CourseCategoryService
    ) {
  }
  ngOnInit() {
    this.GetVendors();
    this.GetCategories();
  }

  ClearObject(){
    
    this.vendor =<VendorModel>{
      id:0
    };
    this.GetVendors();
    this.fileInput = null;
  }

  fileResult: any = null;
  fileInput : any = null;
  async onFileChange(event){
    try {
      let result = await fileUpload(event);
      this.fileResult = result;
    }
    catch{
      this.fileResult = null;
    }
}

  SaveVendor()
  {
    this.btnClicked=true;
    if(this.fileResult !=null)
    {
      this.vendor.base64File = this.fileResult.base64;
        this.vendor.fileName = this.fileResult.name
    }
    this.vendor.categories = this.selectedCategories.toString();
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
       console.log(this.vendors);
    })
  }
  GetCategories()
  {
    this._categoreisService.GetCourseCategories().subscribe((data :any)=>{
       this.categories = data.result;
    })
  }  

  SelectVendorToEdit(vendor)
  {
    try{
      var arr = vendor.categories.toString().split(',');
      var tempArr = [];
      arr.forEach(element => {
        tempArr.push(parseInt(element));
      });
      // this.selectedCategories =  [parseInt('1'),parseInt('2')];
      this.selectedCategories = tempArr;
    }
    catch{
      //Ignore
    }
    this.vendor = vendor;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  SelectCategory(){
    console.log(this.selectedCategories);
  }

}

export interface VendorModel 
{
  id:number;
  name:string;
  base64File:string;
  logo:string;
  fileName:string;
  categories:string;
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