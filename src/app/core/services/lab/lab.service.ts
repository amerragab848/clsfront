import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  baseURL :string;

  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseURL;
  }

  GetLabs(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Lab",{
      headers : headers
    });
  }

  AddLab(lab){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"Lab",lab,{
      headers : headers
    });
  }

  EditLab(lab){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"Lab",lab,{
      headers : headers
    });
  }
  DeleteLab(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"Lab/"+id,{
      headers : headers
    });
  }
}
