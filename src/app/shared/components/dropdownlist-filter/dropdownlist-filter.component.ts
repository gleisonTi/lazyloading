import { Component, Input, OnInit } from '@angular/core';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService, BaseFilterCellComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'incca-dropdownlist-filter',
  templateUrl: './dropdownlist-filter.component.html',
  styleUrls: ['./dropdownlist-filter.component.scss']
})
export class DropdownlistFilterComponent extends BaseFilterCellComponent implements OnInit {


  public get selectedValue(): any {
    const filter = this.filterByField(this.valueField);
    return filter ? filter.value : null;
  }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;

  public dataAux: any[];

  public get defaultItem(): any {
    return {
      [this.textField]: 'Selecione...',
      [this.valueField]: null
    };
  }
  constructor(filterService: FilterService) {
    super(filterService);
  }

  ngOnInit() {
    this.dataAux = this.data;
  }

  public onChange(value: any): void {

    value === null ? // value of the default item
      this.removeFilter(this.valueField) : // remove the filter
      this.updateFilter({ // add a filter for the field with the value
        field: this.valueField,
        operator: 'contains',
        value
      });
  }

  public handlerFilterChange(e: string) {

    switch (this.valueField) {
      case 'ReferenciaId':
        this.data = this.dataAux.filter(
               (item) => item.ReferenciaDescricaoCompleta.toLowerCase().indexOf(e.toLowerCase()) !== -1);
        break;
      case 'GrupoId':
        this.data = this.dataAux.filter(
              (item) => item.GrupoDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
        break;
      case 'PedidoTipoPedido':
        this.data = this.dataAux.filter(
          (item) => item.descricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
        break;

      default :
        break;
    }

  }
}
