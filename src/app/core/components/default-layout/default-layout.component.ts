import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';

import { User } from '../../Authentication/User';


import { AuthenticationService } from '../../Authentication/authentication.service';
import { UserService} from '../../Authentication/user.service';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'incca-default-layout',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public searchText: string
  public primeiroAcesso: any

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    @Inject(DOCUMENT) _DOCUMENT?: any

  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _DOCUMENT.body.classList.contains('sidebar-minimized');
    });
    this.element = _DOCUMENT.body;
    this.changes.observe(<Element> this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(){
    this.primeiroAcesso = this.authenticationService.verificaAlteracaoSenhaAdministrador()
    .subscribe(res => this.primeiroAcesso = res)
  }

  public valuechange(e) {
    this.searchText = e;
    this.navItems = navItems.filter((item) =>
    item.name.toLowerCase().indexOf(e.toLowerCase()) !== -1);
    if (this.navItems.length === 0 ) {
     this.navItems = navItems[2].children.filter((item) => // filtra o children do Cadastros Basicos
     item.name.toLowerCase().indexOf(e.toLowerCase()) !== -1);
    }
    if (this.navItems.length === 0 ) {
      this.navItems = navItems[3].children.filter((item) =>// filtra o children do Market Place
      item.name.toLowerCase().indexOf(e.toLowerCase()) !== -1);
     }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
