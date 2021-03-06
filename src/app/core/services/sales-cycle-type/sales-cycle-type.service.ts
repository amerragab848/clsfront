import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesCycleTypeService {

  baseURL :string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

   GetSalesCycleType() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"SalesCycleType",{
      headers : headers
    });
  }

  AddSalesCycleType(salesCycleType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"SalesCycleType",salesCycleType,{
      headers : headers
    });
  }

  EditSalesCycleType(salesCycleType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"SalesCycleType",salesCycleType,{
      headers : headers
    });
  }

  DeleteSalesCycleType(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"SalesCycleType/"+id,{
      headers : headers
    });
  }

}
