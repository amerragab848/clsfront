import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  baseURL :string;
  
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
   }

   GetCourseRounds(coursrId){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Round/course/"+coursrId+"/rounds",{
      headers : headers
    });
   }

   GetRoundDetails(roundId){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Round/"+roundId+"/details",{
      headers : headers
    });
   }

   GetRoundEndDate(startDate,weeks)
   {
     let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('Accept', 'application/json');
     return this.http.get(this.baseURL+"Round/round/enddate/"+startDate+"/"+weeks,{
       headers : headers
     });
   }
   SaveRound(round)
   {
     let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('Accept', 'application/json');
     return this.http.post(this.baseURL+"Round/",round,{
       headers : headers
     });
   }

   ExecuteRound(roundId){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.baseURL+"Round/"+roundId+"/execute",{
      headers : headers
    });
   }

   DeleteRound(roundId){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.delete(this.baseURL+"Round/"+roundId,{
      headers : headers
    });
   }
}
