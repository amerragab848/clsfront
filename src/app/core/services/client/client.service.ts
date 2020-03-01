import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseURL :string;

  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseURL;
  }

  GetClients(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Client",{
      headers : headers
    });
  }

  AddClient(client){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.baseURL+"Client",client,{
      headers : headers
    });
  }

  EditClient(client){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL+"Client",client,{
      headers : headers
    });
  }

  DeleteClient(id)
  {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"Client/"+id,{
      headers : headers
    });
  }

}
