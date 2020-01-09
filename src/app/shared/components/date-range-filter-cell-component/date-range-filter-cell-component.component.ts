import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { SelectionRange, DateRangePopupComponent } from '@progress/kendo-angular-dateinputs';


@Component({
  selector: 'incca-date-range-filter-cell-component',
  templateUrl: './date-range-filter-cell-component.component.html',
  styleUrls: ['./date-range-filter-cell-component.component.scss']
})
export class DateRangeFilterCellComponentComponent extends BaseFilterCellComponent {
  @Input()
  public filter: CompositeFilterDescriptor;

  @Input()
  public field: string;
  public closePopDate: boolean;

  public filters = [];


  @ViewChild('endDateInput', { read: ElementRef }) public endInput: ElementRef;
  @ViewChild('popup', { read: ElementRef }) public popupDate: DateRangePopupComponent;

  public range: SelectionRange = { start: null, end: null };

  constructor(filterService: FilterService) {
    super(filterService);
  }

  public get start(): Date {
    const first = this.findByOperator("gte");
    return (first || <FilterDescriptor>{}).value;
  }

  public get end(): Date {
    const end = this.findByOperator("lte");
    return (end || <FilterDescriptor>{}).value;
  }

  public get hasFilter(): boolean {
    return this.filtersByField(this.field).length > 0;
  }

  public clearFilter(): void {
    this.filterService.filter(
      this.removeFilter(this.field)
    );
  }

  convert(str) {
    var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }


  public filterRange(start: Date, end: Date): void {
    this.filter = this.removeFilter(this.field);

    if (start) {
      this.filters = [];
      this.filters.push({
        field: this.field,
        operator: "gte",
        value: this.convert(start)
      });
    }

    if (end) {
      this.filters.push({
        field: this.field,
        operator: "lte",
        value: this.convert(end)
      });
    }

    const root = this.filter || {
      logic: "and",
      filters: []
    };

    if (this.filters.length) {
      root.filters.push(...this.filters);
    }

    if (end) {
      this.filterService.filter(root);
    }
  }

  private findByOperator(op: string): FilterDescriptor {
    return this.filtersByField(this.field)
      .filter(({ operator }) => operator === op)[0];
  }
}
