import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
    
  baseURL :string;
  
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

  GetVendors()
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Vendor",{
      headers : headers
    });
  }
  AddVendor(vendor){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"Vendor",vendor,{
      headers : headers
    });
  }
  EditVendor(vendor){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"Vendor",vendor,{
      headers : headers
    });
  }

  DeleteVendor(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"Vendor/"+id,{
      headers : headers
    });
  }

}
