import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  baseURL :string;

  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseURL;
  }

  GetFacilities(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Facility",{
      headers : headers
    });
  }

  AddFacility(facility){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"Facility",facility,{
      headers : headers
    });
  }

  EditFacility(facility){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"Facility",facility,{
      headers : headers
    });
  }
}
