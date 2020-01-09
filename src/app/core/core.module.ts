import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppBreadcrumbModule, AppHeaderModule, AppFooterModule, AppSidebarModule } from '@coreui/angular';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { LoginComponent } from './components/login/login.component';
import { PrimeiroAcessoModule } from './components/primeiro-acesso/primeiro-acesso.module';

import { ToastrModule } from 'ngx-toastr';
import { BreadCrumbComponent } from '../shared/components/bread-crumb/bread-crumb.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppBreadcrumbModule.forRoot(),
    ToastrModule.forRoot(),
    AppHeaderModule,
    AppSidebarModule,
    AppFooterModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    PrimeiroAcessoModule
  ],
  declarations: [
    NavbarComponent,
    DefaultLayoutComponent,
    BreadCrumbComponent,
    LoginComponent,
  ],
  exports: [

    // shared modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule,
    // shared components
    NavbarComponent,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppSidebarModule,
    AppFooterModule,
    PerfectScrollbarModule
  ]

})
export class CoreModule { }
