import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy, Injector } from '@angular/core';
import { VariacaoService } from '../shared/variacao.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { map } from 'rxjs/operators/map';
import { Variacao } from '../shared/variacao.model';
import { ColecaoService } from '../../colecao/shared/colecao.service';
import { FabricanteService } from '../../fabricante/shared/fabricante.service';
import { TourService } from 'ngx-tour-ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Help } from 'src/app/shared/models/help.model';

import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';

const createFormGroup = (dataItem?: Variacao) => {
  if (dataItem) {
    return new FormGroup({
      VariacaoId: new FormControl(dataItem.VariacaoId),
      VariacaoDescricao: new FormControl(dataItem.VariacaoDescricao, Validators.required),
      VariacaoConsumo: new FormControl(dataItem.VariacaoConsumo),
      VariacaoFabricante: new FormControl(dataItem.VariacaoFabricante),
      VariacaoColecao: new FormControl(dataItem.VariacaoColecao),
      VariacaoInativo: new FormControl(dataItem.VariacaoInativo),
      VariacaoOrdemTela: new FormControl(dataItem.VariacaoOrdemTela, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      VariacaoAutomaticaParaTodasReferencias: new FormControl(dataItem.VariacaoAutomaticaParaTodasReferencias),
    }
    );
  } else {
    return new FormGroup({
      VariacaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      VariacaoDescricao: new FormControl('', Validators.required),
      VariacaoConsumo: new FormControl(false),
      VariacaoFabricante: new FormControl(false),
      VariacaoColecao: new FormControl(false),
      VariacaoInativo: new FormControl(false),
      VariacaoOrdemTela: new FormControl(0, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      VariacaoAutomaticaParaTodasReferencias: new FormControl(false),
    });
  }
};
@Component({
  selector: 'incca-variacao-grid',
  templateUrl: './variacao-grid.component.html',
  styleUrls: ['./variacao-grid.component.scss']
})
export class VariacaoGridComponent extends BaseResourceGridComponent<Variacao> implements OnInit {

  @ViewChild('Grid') grid: ElementRef;
  public columns: any[] = [
    { field: 'VariacaoDescricao', title: 'Descrição' },
    { field: 'VariacaoConsumo', title: 'Consumo' },
    { field: 'VariacaoFabricante', title: 'Fabricante' },
    { field: 'VariacaoColecao', title: 'Colecao' },
    { field: 'VariacaoInativo', title: 'Inativo' },
    { field: 'VariacaoOrdemTela', title: 'Ordem na Tela' },
    { field: 'VariacaoAutomaticaParaTodasReferencias', title: 'Automático para todas as referências' }
  ];

  constructor(
    protected injector: Injector,
    @Inject(VariacaoService) editServiceFactory: any,
    protected variacaoService: VariacaoService, public tourService: TourService) {
    super(injector, new Variacao(), variacaoService = editServiceFactory(), createFormGroup);

    this.tourService.initialize([{
      anchorId: 'start',
      title: ' Bem Vindo',
      content: 'Bem Vindo', // this.getHelp("'Variacao'","'Tela'").helpTexto " ,
      placement: 'top',
    },
    {
      anchorId: 'novo',
      title: 'Criar Tipo de Variação',
      content: ' Clique aqui para criar um Tipo de Variação',
      placement: 'bottom',
    },
    {
      anchorId: 'sub',
      title: 'SubVariação',
      content: 'clique aqui para criar um Tipo de Variação',
      placement: 'bottom',

    }
    ], {
        route: 'variacao',
      });
  }

  ngOnInit() {
    super.ngOnInit();
    this.resourceService.getAll().subscribe(res => console.log(res))
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.variacaoService.read(this.gridState);
    this.variacaoService.getAll(this.gridState).subscribe(res => console.log(res));

  }

  public getValueCheckBox(dataItem: any, col: string): boolean {
    switch (col) {
      case 'VariacaoConsumo': return dataItem.VariacaoConsumo;
      case 'VariacaoFabricante': return dataItem.VariacaoFabricante;
      case 'VariacaoColecao': return dataItem.VariacaoColecao;
      case 'VariacaoInativo': return dataItem.VariacaoInativo;
      case 'VariacaoAutomaticaParaTodasReferencias': return dataItem.VariacaoAutomaticaParaTodasReferencias;
      default: return false;
    }
  }

  public initTour(): void {
    this.tourService.start();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
    console.log(formGroup.value);
    const variacao: Variacao = Variacao.fromJson(formGroup.value);
    console.log(variacao);
    this.variacaoService.save(variacao, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Variacao.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }


}
