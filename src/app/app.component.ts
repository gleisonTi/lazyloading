import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from './core/Authentication/authentication.service';
import { User } from './core/Authentication/User';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

/*
import { Component } from '@angular/core';
import { navItems } from './core/_nav';

@Component({
  selector: 'incca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  title = 'incca-web';

}
*/
