import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:LoginModel=<LoginModel>{};
  constructor(private srv : LoginService,private router: Router) { }

  ngOnInit() {
  }

  Login()
  {
    this.srv.Login(this.user).subscribe((data : any) =>{
      localStorage.setItem("auth-token",data.token);
      this.router.navigate(['/app']);
    });
  }
}

export interface LoginModel
{
  username : string;
  password:string;
}