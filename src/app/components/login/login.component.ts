import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch/branch.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:LoginModel=<LoginModel>{};
  constructor(private srv : LoginService,private router: Router
    ,private http: HttpClient) { }
    
  baseURL :string;
  ngOnInit() {
    this.baseURL = environment.baseURL;
  }

  Login()
  {
    // this.srv.Login(this.user).subscribe((data : any) =>{
    //   this.srv.Login(this.user).subscribe((data : any)=>{
    //     alert(data);
    //   });
    //   localStorage.setItem("auth-token",data.token);
    //   this.router.navigate(['/app']);
    // });

      if(this.user.username == "dr.fatma" && this.user.password == "Cls@123" ){
        localStorage.setItem("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkci5mYXRtYSIsImp0aSI6ImUyNzBhZjE5LTI5YTgtNGZiMy04YTJlLTQyNDVhMjA5ZTMyMSIsImV4cCI6MTU5NDU4NTY1MSwiaXNzIjoiaHR0cDovL2RvdG5ldGRldGFpbC5uZXQiLCJhdWQiOiJodHRwOi8vZG90bmV0ZGV0YWlsLm5ldCJ9.1Kp3hcU-WdNlBcUCej346dx_hUJddzdVZuBfk6XFnPg");
        this.router.navigate(['/app']);
      }
      else{
        alert("Invalid Username or Password");
      }
    
  }
}

export interface LoginModel
{
  username : string;
  password:string;
}