import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL :string;
  
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

  Login(user){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"authenticate",user,{
      headers : headers
    });
  }
}
