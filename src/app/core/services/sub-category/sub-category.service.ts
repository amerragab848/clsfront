import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  baseURL :string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

  GetSubCategories(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"CourseSubCategory",{
      headers : headers
    });
  }

  GetCourseCategories(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"CourseCategory",{
      headers : headers
    });
  }

  AddSubCategory(subCategory){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"CourseSubCategory",subCategory,{
      headers : headers
    });
  }

  EditSubCategory(subCategory){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"CourseSubCategory",subCategory,{
      headers : headers
    });
  }
}
