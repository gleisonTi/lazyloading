import { GridDataResult } from '@progress/kendo-angular-grid';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'incca-select-column-excel',
  templateUrl: './select-column-excel.component.html',
  styleUrls: ['./select-column-excel.component.scss']
})
export class SelectColumnExcelComponent implements OnInit {

  @Input() view: Observable<GridDataResult>;
  public columns: Array<{ colunm: string }> = [];

  constructor() { }

  ngOnInit() {
    this.view.subscribe(res => {
      if (res.data) {
        for (let key in res.data[0]) {
          this.columns.push({ colunm: key });
        }
      }
    });
  }


}
