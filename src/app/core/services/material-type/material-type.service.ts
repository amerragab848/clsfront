import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialTypeService {
    
  baseURL :string;
  
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

  GetMaterialTypes()
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"MaterialType",{
      headers : headers
    });
  }
  AddMaterialType(materialType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"MaterialType",materialType,{
      headers : headers
    });
  }
  EditMaterialType(materialType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"MaterialType",materialType,{
      headers : headers
    });
  }

  DeleteMaterialType(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"MaterialType/"+id,{
      headers : headers
    });
  }
}
