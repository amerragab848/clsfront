import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  baseURL :string;

  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseURL;
  }

  GetInstructors(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Instructor",{
      headers : headers
    });
  }

  AddInstructor(instructor){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"Instructor",instructor,{
      headers : headers
    });
  }

  EditInstructor(instructor){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"Instructor",instructor,{
      headers : headers
    });
  }

  DeleteInstructor(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"Instructor/"+id,{
      headers : headers
    });
  }
  GetInstructorCourses(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Instructor/"+id+"/courses",{
      headers : headers
    });
  }

  GetCourseInstructors(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Instructor/"+id+"/courseins",{
      headers : headers
    });
  }

  SaveInstructorRate(rate){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"InstructorCourseRates",rate,{
      headers : headers
    });
  }

  GetInstructorRates(id){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"InstructorCourseRates/?id="+id,{
      headers : headers
    });
  }
  DeleteInstructorRates(id){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"InstructorCourseRates/?id="+id,{
      headers : headers
    });
  }
}


