import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from '../product.model';
import { EditService } from '../edit.service';

import { map } from 'rxjs/operators/map';

@Component({
  selector: 'incca-gridexemplo',
  templateUrl: './gridexemplo.component.html',
  styleUrls: ['./gridexemplo.component.css']
})

export class GridexemploComponent implements OnInit {

  public view?: Observable<GridDataResult>;
  public gridState: State = {
      sort: [],
      skip: 0,
      take: 10
  };
  public formGroup: FormGroup;

  private editService: EditService;
  private editedRowIndex: number;
  public gridDataResult: GridDataResult

  constructor(@Inject(EditService) editServiceFactory: any) {
      this.editService = editServiceFactory();
  }

  fromjson(){

  }


  public ngOnInit(): void {
      this.view = this.editService.pipe(map(data => process(data, this.gridState)));
      this.editService.pipe(map(data => process(data, this.gridState))).subscribe(res => this.gridDataResult = res);
      this.editService.read();
      console.log(this.view);
  }

  protected fromJson(jsonData: any): Observable<GridDataResult> {
    return Object.assign(new Observable<GridDataResult>(), jsonData);
  }


  public onStateChange(state: State) {
      this.gridState = state;

      this.editService.read();
  }

  public addHandler({sender}) {
      this.closeEditor(sender);

      this.formGroup = new FormGroup({
          'ProductID': new FormControl(),
          'ProductName': new FormControl('', Validators.required),
          'UnitPrice': new FormControl(0),
          'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
          'Discontinued': new FormControl(false)
      });

      sender.addRow(this.formGroup);
  }

  public editHandler({sender, rowIndex, dataItem}) {
      this.closeEditor(sender);

      this.formGroup = new FormGroup({
          'ProductID': new FormControl(dataItem.ProductID),
          'ProductName': new FormControl(dataItem.ProductName, Validators.required),
          'UnitPrice': new FormControl(dataItem.UnitPrice),
          'UnitsInStock': new FormControl(
                  dataItem.UnitsInStock,
                  Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
          'Discontinued': new FormControl(dataItem.Discontinued)
      });

      this.editedRowIndex = rowIndex;

      sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({sender, rowIndex}) {
      this.closeEditor(sender, rowIndex);
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
      const product: Product = formGroup.value;

      this.editService.save(product, isNew);

      sender.closeRow(rowIndex);
  }

  public removeHandler({dataItem}) {
      this.editService.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
      grid.closeRow(rowIndex);
      this.editedRowIndex = undefined;
      this.formGroup = undefined;
  }
}
