import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GradeGridComponent } from './grade-grid/grade-grid.component';

const routes: Routes = [
  {path:'',component:GradeGridComponent,data:{
    title:"Grade"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
