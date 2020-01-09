import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { DefaultUrlSerializer, UrlTree, UrlSerializer } from '@angular/router';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { GridModule } from '@progress/kendo-angular-grid';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GlobalErrorHandler } from './shared/helpers/global-errorHandler';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { IntlModule } from '@progress/kendo-angular-intl';
import '@progress/kendo-angular-intl/locales/pt/all';
import { Interceptor } from './shared/interceptors/token.module';



registerLocaleData(ptBr)


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    // Optional Step: Do some stuff with the url if needed.

    // If you lower it in the optional step
    // you don't need to use "toLowerCase"
    // when you pass it down to the next function
    return super.parse(url.toLowerCase());
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    IntlModule,
    Interceptor,

    //  GridModule,
    //BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' },
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  },
  {
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer,
  },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }