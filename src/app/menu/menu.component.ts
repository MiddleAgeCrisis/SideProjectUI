import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../_services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private router: Router,
    private authenticationService:AuthenticationService) {
      this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    }

  ngOnInit(): void {  
    this.router.events.subscribe(event => { 
      if (event instanceof NavigationEnd) {  
        this.isLoggedIn = this.authenticationService.isUserLoggedIn();
      }
    });
  }

  handleLogout() {
    this.authenticationService.logout();  
    this.router.navigate(['./login']);
  }
}
