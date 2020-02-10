import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {

  baseURL :string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

   GetLearningPathes(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"LearningPath",{
      headers : headers
    });
  }

  AddLearningPath(learningPath){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"LearningPath",learningPath,{
      headers : headers
    });
  }

  EditLearningPath(learningPath){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"LearningPath",learningPath,{
      headers : headers
    });
  }

  DeleteLearningPath(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"LearningPath/"+id,{
      headers : headers
    });
  }
}
