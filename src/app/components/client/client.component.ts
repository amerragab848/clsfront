import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import {  SelectionModel  } from '@angular/cdk/collections';  
import {   MatTableDataSource } from '@angular/material/table'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  //clients : ClientModel[];
  pageOfItems: Array<any>;
  searchKey:string;
  btnClicked:boolean = false;
  selection = new SelectionModel <ClientModel> (false, []);  
  clients: MatTableDataSource < ClientModel > ;  
  constructor(
    private _toastSrv : ToastService,
    private _clientService : ClientService
  ) { }
//
   /** Whether the number of selected elements matches the total number of rows. */  
   isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.clients && this.clients.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.selection.select();//this.materialTypes.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: ClientModel): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;  
} 
//
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
  SelectClientForEdit()
  {
    
    const client = this.selection.selected; 
    if (client.length > 0) { 
    this.client = client[0];

     }
    else {  
            
              this._toastSrv.error("Failed","Select at least one row");
    
          }
   
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
  DeleteClientData()
  {
      const numSelected = this.selection.selected;  
       var id=numSelected[0].id;
       if (numSelected.length > 0) { 
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
       else {  
               
                 this._toastSrv.error("Failed","Select at least one row");
       
             }
    
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
