import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'incca-grid-remote',
  template: `
        <kendo-grid
            inccaRemoteBinding
            [pageSize]="10"
            [pageable]="true"
            [sortable]="true"
            [height]="500"
            filterable="menu"

          >
        <kendo-grid-column field="ProductID" width="80"></kendo-grid-column>
        <kendo-grid-column field="ProductName"></kendo-grid-column>
        <kendo-grid-column field="UnitPrice" width="80" format="{0:c}"></kendo-grid-column>
        <kendo-grid-column field="UnitsInStock" width="80"></kendo-grid-column>
       </kendo-grid>
    `
  //templateUrl: './grid-remote.component.html',
  //styleUrls: ['./grid-remote.component.scss']
})
export class GridRemoteComponent {
}

/*

export class GridRemoteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/
