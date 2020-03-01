import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ClientService } from 'src/app/core/services/client/client.service';

export interface ClientModel 
{
  id:number;
  nameAR: string;
  nameEN: string;
  email: string;
  mobileNumber: number;
  address: string;
  birthday: string;
  title: string;
  notes: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client : ClientModel =<ClientModel>{
    id :0
  };

  clients : ClientModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;

  constructor(
    private _toastSrv : ToastService,
    private _clientService : ClientService
  ) { }

  GetClients() {
    this._clientService.GetClients().subscribe((data :any)=>{
       this.clients = data.result;
    })
  } 

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ClearObject(){
    this.client =<ClientModel>{
      id:0
    };
    this.GetClients();
  }

  SaveClient()
  {
    this.btnClicked=true;
    if(this.client.id ==0){
      this._clientService.AddClient(this.client).subscribe((data : any) =>{
        if(data.code === 200){
          this._toastSrv.success("","Saved Successfully");
          this.ClearObject();
          this.GetClients();
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
      this._clientService.EditClient(this.client).subscribe((data : any) =>{
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

  SelectClientToEdit(client)
  {
    this.client = client;
  }

  DeleteClient(id)
  {
      this._clientService.DeleteClient(id).subscribe((data : any) =>{
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
    this.GetClients();
  }

}


@Pipe({
  name:'clientFilter'
})
export class clientFilterPipe implements PipeTransform{
  transform(contents : ClientModel[] , searchKey) : ClientModel[] {
    if(!contents || !searchKey){
      return contents;
    }
    return contents.filter(c => c.nameEN.toLowerCase().indexOf(searchKey.toLowerCase()) !==-1);
  }
}
