import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  baseURL :string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

  GetCourseCategories(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"CourseCategory",{
      headers : headers
    });
  }

  AddCourseCategory(courseCategory){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"CourseCategory",courseCategory,{
      headers : headers
    });
  }

  EditCourseCategory(courseCategory){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"CourseCategory",courseCategory,{
      headers : headers
    });
  }

  DeleteCategory(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"CourseCategory/"+id,{
      headers : headers
    });
  }
}
