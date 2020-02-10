import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {
    
  baseURL :string;
  
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

  GetCourseTypes()
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"CourseType",{
      headers : headers
    });
  }
  AddCourseType(courseType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"CourseType",courseType,{
      headers : headers
    });
  }
  EditCourseType(courseType){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"CourseType",courseType,{
      headers : headers
    });
  }

  DeleteCourseType(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"CourseType/"+id,{
      headers : headers
    });
  }

}
