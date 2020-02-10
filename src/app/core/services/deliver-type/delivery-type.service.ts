import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryTypeService {

  baseURL :string;

  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseURL;
  }

  GetDeliveryTypes(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"DeliveryType",{
      headers : headers
    });
  }

  AddDeliveryType(deliveryType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"DeliveryType",deliveryType,{
      headers : headers
    });
  }

  EditDeliveryType(deliveryType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"DeliveryType",deliveryType,{
      headers : headers
    });
  }
  DeleteDeliveryType(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"DeliveryType/"+id,{
      headers : headers
    });
  }
}
