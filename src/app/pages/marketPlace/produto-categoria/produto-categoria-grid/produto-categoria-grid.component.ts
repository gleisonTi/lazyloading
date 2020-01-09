import { Component, OnInit, Injector, Input } from '@angular/core';
import { ProdutoCategoria } from '../shared/produto-categoria.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoCategoriaService } from '../shared/produto-categoria.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { CategoriaService } from '../../categoria/shared/categoria.service';
import { Categoria } from 'src/app/pages/marketPlace/categoria/shared/categoria.model';

const createFormGroup = (dataItem?: ProdutoCategoria) => {
  if (dataItem) {
    return new FormGroup({
      ProdutoId: new FormControl(dataItem.ProdutoId),
      ProdutoCategoriaId: new FormControl(dataItem.ProdutoCategoriaId),
      CategoriaId: new FormControl(dataItem.CategoriaId, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      ProdutoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ProdutoCategoriaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      CategoriaId: new FormControl('00000000-0000-0000-0000-000000000000', Validators.required),
    });
  }
};


@Component({
  selector: 'incca-produto-categoria-grid',
  templateUrl: './produto-categoria-grid.component.html',
  styleUrls: ['./produto-categoria-grid.component.scss']
})
export class ProdutoCategoriaGridComponent extends BaseResourceGridComponent<ProdutoCategoria> implements OnInit {

  @Input() produtoId: string;
  public categoriaList: Categoria[] = [];
  public dataCategoria: Categoria[] = []; // necessário para filtragem

  constructor(protected injector: Injector,
    protected produtoCategoriaService: ProdutoCategoriaService,
    public categoriaService: CategoriaService
  ) {
    super(injector, new ProdutoCategoria(), produtoCategoriaService, createFormGroup);
  }
  public ngOnInit(): void { // necessario help no filho quando o componente e chamado no windows
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ProdutoCategoria').subscribe(res => this.helpList = res);
    this.resourceService.read(this.gridState, this.produtoId);
    this.view = this.resourceService
    this.categoriaService.getAll(this.gridState, this.produtoId).subscribe(res => {
      console.log(res);
      this.categoriaList = res.data
      this.dataCategoria = res.data
    })
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('ProdutoId').setValue(this.produtoId);
    this.resource = ProdutoCategoria.fromJson(formGroup.value);
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = ProdutoCategoria.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public getName(dataItem: ProdutoCategoria): string {
    return this.categoriaList.length !== 0 ?
      this.categoriaList.find(item => item.CategoriaId === dataItem.CategoriaId).CategoriaSubCategoriaNome : 'carregando';
  }

  handleCategoriaFilter(value: string) {
    this.dataCategoria = this.categoriaList.filter((item) => item.CategoriaSubCategoriaNome.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }



}
