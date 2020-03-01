import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CorporateService } from 'src/app/core/services/corporate/corporate.service';

export interface CorporateModel 
{
  id:number;
  name: string;
  fax: string;
  email: string;
  contactPersonEmail: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.css']
})
export class CorporateComponent implements OnInit {

  corporate : CorporateModel =<CorporateModel>{
    id :0
  };

  corporates : CorporateModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _corporateService : CorporateService
  ) { }

  GetCorporates() {
    this._corporateService.GetCorporates().subscribe((data :any)=>{
       this.corporates = data.result;
       console.log(this.corporates)
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.corporate =<CorporateModel>{
      id:0
    };
    this.GetCorporates();
  }

  SaveCorporate()
  {
    this.btnClicked=true;
    if(this.corporate.id ==0){
      this._corporateService.AddCorporate(this.corporate).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetCorporates();
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
      this._corporateService.EditCorporate(this.corporate).subscribe((data : any) =>{
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

  SelectCorporateToEdit(corporate)
  {
    this.corporate = corporate;
  }

  DeleteCorporaet(id)
  {
      this._corporateService.DeleteCorporate(id).subscribe((data : any) =>{
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
    this.GetCorporates();
  }

}

@Pipe({
  name:'corporateFilter'
})
export class corporateFilterPipe implements PipeTransform{
  transform(contents : CorporateModel[] , searchKey) : CorporateModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
