import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { VariacaoService } from '../../variacao/shared/variacao.service';
import { Observable } from 'rxjs';
import { GridDataResult, BooleanFilterCellComponent } from '@progress/kendo-angular-grid';
import { ReferenciaVariacaoService } from '../shared/referencia-variacao.service';
import { ReferenciaVariacao } from '../shared/referencia-variacao.model';
import { Variacao } from '../../variacao/shared/variacao.model';
import { map, tap } from 'rxjs/operators';
import { FormControl, FormGroup, } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { TourHotkeyListenerComponent } from 'ngx-tour-core';
import { LoadingService } from 'src/app/shared/services/loading.service';

const createFormGroup = (dataItem?: ReferenciaVariacao) => {
  if (dataItem) {
    return new FormGroup({
      ReferenciaId: new FormControl(dataItem.ReferenciaId),
      ReferenciaVariacaoId: new FormControl(dataItem.ReferenciaVariacaoId),
      VariacaoId: new FormControl(dataItem.VariacaoId),
      ReferenciaVariacaoInativo: new FormControl(dataItem.ReferenciaVariacaoInativo),
      ReferenciaVariacaoGeraProduto: new FormControl(dataItem.ReferenciaVariacaoGeraProduto),
    }
    );
  } else {

    return new FormGroup({
      ReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaVariacaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      VariacaoId: new FormControl(''),
      ReferenciaVariacaoInativo: new FormControl(false),
      ReferenciaVariacaoGeraProduto: new FormControl(false),
    });

  }
};

@Component({
  selector: 'incca-choose-variacao',
  templateUrl: './choose-variacao.component.html',
  styleUrls: ['./choose-variacao.component.scss'],
  providers: [ReferenciaVariacaoService]
})
@Injectable()
export class ChooseVariacaoComponent implements OnInit {
  @Input() variacaoId: string;
  @Input() referenciaId: string;
  @Input() fabricanteId: string;
  @Input() colecaoId: string;
  @Input() theCheckbox: boolean;
  public view: Observable<GridDataResult>;
  public variacaoService: VariacaoService;
  public referenciaList: ReferenciaVariacao[] = [];
  public variacoesSelecionadas: string[] = [];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };

  constructor(
    @Inject(VariacaoService) editServiceFactory: any,
    public referenciaVariacaoService: ReferenciaVariacaoService,
    public loadingService: LoadingService,
  ) {
    this.variacaoService = editServiceFactory();
  }

  get loading() {
    return this.loadingService.isLoading();
  }

  ngOnInit() {
    this.referenciaVariacaoService.getAll(null, this.referenciaId).subscribe(res => this.referenciaList = res.data);
    this.referenciaVariacaoService.getAll(null, this.referenciaId).pipe(map(res => {
      this.referenciaList = res.data;
      // testa se a lista e undefined se não retorna lista com array de guids para seleção
      return this.referenciaList ? this.referenciaList.map(item => item.VariacaoId) : [];
    }))
      .subscribe(res => this.variacoesSelecionadas = res);

    this.variacaoService.read(null,this.variacaoId);
    this.view = this.variacaoService.pipe(map(res => {
      if (res && res.data) {
        const data = res.data.filter((item: Variacao) => { // filtra variações a partir de fabricante e colecao
          return item.FabricanteId === this.fabricanteId && item.ColecaoId === this.colecaoId;
        });
        return { data, total: res.total }; // GridDataResult
      }
    }));
  }

  public onStateChange(state: State) {
    this.gridState = state
    this.variacaoService.read(this.gridState,this.variacaoId);
  }

  public selectionChange(e) {
    if (e.selected) {

      const referenciaVariacao = new ReferenciaVariacao(
        '00000000-0000-0000-0000-000000000000',
        this.referenciaId,
        e.selectedRows[0].dataItem.VariacaoId,
        false, undefined, undefined, false
      );
      this.referenciaVariacaoService.save(referenciaVariacao, true).subscribe(() => {
        this.referenciaVariacaoService.getAll(null, this.referenciaId).subscribe(res => this.referenciaList = res.data);
      });

    } else {
      let refVariacaoAux: ReferenciaVariacao;
      refVariacaoAux = this.referenciaList.find(item => // busca dados pela VariacaoId e ReferenciaId
        item.ReferenciaId === this.referenciaId && item.VariacaoId === e.deselectedRows[0].dataItem.VariacaoId);
      const referenciaVariacao = ReferenciaVariacao.fromJson(refVariacaoAux);
      this.referenciaVariacaoService.remove(referenciaVariacao).subscribe(() => {
        this.referenciaVariacaoService.getAll(null, this.referenciaId).subscribe(res => this.referenciaList = res.data);
      });
    }
  }

  // funcões para checkbox do grid
  public getcheckValue(dataItem: Variacao, atributo: string ): boolean {
    if (this.referenciaList) {
      if (atributo === 'Inativo') {
        const isInativo = this.referenciaList.find(item => item.VariacaoId === dataItem.VariacaoId) ?
        this.referenciaList.find(item => item.VariacaoId === dataItem.VariacaoId).ReferenciaVariacaoInativo : false;
        return isInativo;
      } else {
        const isGeraProduto = this.referenciaList.find(item => item.VariacaoId === dataItem.VariacaoId) ?
        this.referenciaList.find(item => item.VariacaoId === dataItem.VariacaoId).ReferenciaVariacaoGeraProduto : false;
        return isGeraProduto;
      }

    } else {
      return false;
    }
  }

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    // .log(dataItem);
    if (!isEdited) {
      sender.editCell(rowIndex, columnIndex, createFormGroup(dataItem));
    }

  }

  public cellCloseHandler(args: any) {
    // const { formGroup, dataItem } = args;
    // console.log(args);
  }

  public changeInativo(e, dataItem, atributo) {

    let referenciaVariacao: ReferenciaVariacao;
    referenciaVariacao = this.referenciaList.find(item => {
      return item.VariacaoId === dataItem.VariacaoId;
    });

    if (referenciaVariacao) {
      referenciaVariacao = ReferenciaVariacao.fromJson(referenciaVariacao); // passa dados para Id de BaseResourceModel

      if (e.target.checked) {
        if (atributo === 'Inativo') {
          console.log(atributo);
          referenciaVariacao.ReferenciaVariacaoInativo = true;
        } else {
          console.log(atributo);
          referenciaVariacao.ReferenciaVariacaoGeraProduto = true;
        }
        this.referenciaVariacaoService.save(referenciaVariacao, false).subscribe((res) => { // update
          this.referenciaVariacaoService.getAll(null, res.ReferenciaId).subscribe(res => this.referenciaList = res.data);
        });

        //  console.log(referenciaVariacao);
      } else {

        if (atributo === 'Inativo') {
          console.log(atributo);
          referenciaVariacao.ReferenciaVariacaoInativo = false;
        } else {
          console.log(atributo);
          referenciaVariacao.ReferenciaVariacaoGeraProduto = false;
        }
        this.referenciaVariacaoService.save(referenciaVariacao, false).subscribe((res) => { // update
          this.referenciaVariacaoService.getAll(null, res.ReferenciaId).subscribe(res => this.referenciaList = res.data);
        });
        // console.log(referenciaVariacao);

      }

    } else {

    }

  }

}
