import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fixed-navbar',
  templateUrl: './fixed-navbar.component.html',
  styleUrls: ['./fixed-navbar.component.css']
})
export class FixedNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Logout(){
    localStorage.removeItem("auth-token");
    this.router.navigate(['/auth']);
  }
}
