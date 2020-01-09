import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MktplaceRoutingModule } from './mktplace-routing.module';
import { MktplaceComponent } from './mktplace/mktplace.component';

@NgModule({
  declarations: [MktplaceComponent],
  imports: [
    CommonModule,
    MktplaceRoutingModule
  ]
})
export class MktplaceModule { }
