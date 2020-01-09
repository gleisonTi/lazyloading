import { Component, OnInit, Injector, Input } from '@angular/core';
import { ProdutoSku } from '../shared/produto-sku.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoSkuService } from '../shared/produto-sku.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { TamanhoService } from '../../tamanho/shared/tamanho.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Tamanho } from '../../tamanho/shared/tamanho.model';

const createFormGroup = (dataItem?: ProdutoSku) => {
  if (dataItem) {
    return new FormGroup({
      ProdutoId: new FormControl(dataItem.ProdutoId),
      ProdutoSKUCodigo: new FormControl(dataItem.ProdutoSKUCodigo, Validators.required),
      ProdutoSKUTamanhoId: new FormControl(dataItem.ProdutoSKUTamanhoId),
      ProdutoSKUId: new FormControl(dataItem.ProdutoSKUId ? dataItem.ProdutoSKUId : '00000000-0000-0000-0000-000000000000'),
    }
    );
  } else {
    return new FormGroup({
      ProdutoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ProdutoSKUCodigo: new FormControl('', Validators.required),
      ProdutoSKUTamanhoId: new FormControl('', Validators.required),
      ProdutoSKUId: new FormControl('00000000-0000-0000-0000-000000000000'),
    });
  }
};
@Component({
  selector: 'incca-produto-sku-grid',
  templateUrl: './produto-sku-grid.component.html',
  styleUrls: ['./produto-sku-grid.component.scss']
})
export class ProdutoSkuGridComponent extends BaseResourceGridComponent<ProdutoSku> implements OnInit {
  @Input() produtoId: string;
  @Input() gradeId: string;
  public tamanhoList: Tamanho[] = []
  public dataTamanho: Tamanho[] = []

  constructor(
    protected injector: Injector,
    protected produtoSkuService: ProdutoSkuService,
    public tamanhoService: TamanhoService,
  ) {
    super(injector, new ProdutoSku(), produtoSkuService, createFormGroup);
  }
  public ngOnInit(): void {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ProdutoSKU').subscribe(res => { this.helpList = res; });
    this.resourceService.read(this.gridState, this.produtoId);
    this.view = this.resourceService

    this.tamanhoService.getAll(this.gridState, this.gradeId).subscribe(res => {
      this.tamanhoList = res.data
      this.dataTamanho = res.data
    })
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('ProdutoId').setValue(this.produtoId);
    this.resource = ProdutoSku.fromJson(formGroup.value);
    // salva e atualiza os dados do sku
    this.resourceService.save(this.resource, isNew)
    sender.closeRow(rowIndex);
  }
  public removeHandler({ dataItem }) {
    this.resource = ProdutoSku.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public getName(dataItem: ProdutoSku): string {
    return this.tamanhoList.length !== 0 ? this.tamanhoList.find(item =>
      item.TamanhoId === dataItem.ProdutoSKUTamanhoId).Tamanho : 'carregando'
  }

  handleTamanhoFilter(value: string) {
    this.dataTamanho = this.tamanhoList.filter((item) => item.Tamanho.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public GeraCodigoSKU() {
    this.formGroup.get("ProdutoSKUCodigo").setValue("COD-SKU-" + Math.floor(Math.random() * 1000))
  }

  public onTamanhoChange(e) {
    this.tamanhoList.filter(item => item.TamanhoId === e)
  }


}
