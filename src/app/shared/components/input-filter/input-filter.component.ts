import { Component, Input, OnInit } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { FilterService, BaseFilterCellComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'incca-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss']
})
export class InputFilterComponent extends BaseFilterCellComponent {

  public get selectedValue(): any {
    const filter = this.filterByField(this.valueField);
    return filter ? filter.value : null;
  }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public valueField: string;

  constructor(filterService: FilterService) {
    super(filterService);

  }

  onSearchChange(event: any) {

    event.target.value === null ? // value of the default item
      this.removeFilter(this.valueField) : // remove the filter

      this.updateFilter({ // add a filter for the field with the value
          field: this.valueField,
          operator: 'contains',
          value: event.target.value
      });
  }

}
