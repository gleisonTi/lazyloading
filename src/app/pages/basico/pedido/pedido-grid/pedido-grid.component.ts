import { ParametroService } from './../../parametro/shared/parametro.service';
import { Component, OnInit, Injector, ViewChild, ComponentRef, ViewRef, ViewEncapsulation, ElementRef } from '@angular/core';
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PedidoService } from '../shared/pedido.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { PedidoFormComponent } from '../pedido-form/pedido-form.component';
import { toDataURL } from '@progress/kendo-angular-excel-export';
import { WindowComponent } from '@progress/kendo-angular-dialog';
import { StringFilterCellComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { SelectionRange } from '@progress/kendo-angular-dateinputs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'incca-pedido-grid',
  templateUrl: './pedido-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./pedido-grid.component.scss']
})

export class PedidoGridComponent extends BaseResourceGridComponent<Pedido> implements OnInit {

  public createFormGroup: FormGroup;
  public openedCadPedido = false;
  public openedRemovePedido = false;

  // parametros para o pedido
  public tipoComissao: string;


  public tipoComissaoPedidoItem: boolean;

  public isNew: boolean;
  public tipoPedidoList: Array<{ PedidoTipoPedido: number, descricao: string }> = [
    { PedidoTipoPedido: 6, descricao: 'Orçamento' },
    { PedidoTipoPedido: 4, descricao: 'Venda' },
    { PedidoTipoPedido: 1, descricao: 'Consignação' },
    { PedidoTipoPedido: 5, descricao: 'Cancelado' },
  ];
  public columns: any[] = [
    { field: 'PedidoCodigo', title: 'Código' },
    { field: 'ClienteNome', title: 'Nome do Cliente' },
    { field: 'PedidoTipoPedido', title: 'Tipo do Pedido' },
    { field: 'PedidoEmissao', title: 'Emissão' },
    { field: 'PedidoTotalValor', title: 'Total do Pedido' },
  ];
  constructor(
    protected injector: Injector,
    public pedidoService: PedidoService,
    public parametroService: ParametroService,
    public popupMessage: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    super(injector, new Pedido(), pedidoService, createFormGroup);
    this.parametroService.getById('d257c8fb-d2cf-4072-a1db-213b734c3a7f').subscribe(res => {
      this.tipoComissao = res.ParametroValor;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    // busca parametro


  }

  public removeHandler({ dataItem }) {
    this.openedRemovePedido = true
    this.resource = Pedido.fromJson(dataItem);
    // this.resourceService.remove(this.resource);
  }

  public buttonConfirm(confirm: boolean) {
    if (confirm) {
      this.pedidoService.removePedido(this.resource.PedidoId).subscribe(res => {
        if (res.Messages) {
          res.Messages.forEach(item => {
            if (item.Id === 'Success') {
              this.popupMessage.success(item.Description, item.Id);
            } else {
              this.popupMessage.error(item.Description, item.Id);
            }
          });
        }
        this.resourceService.read(this.gridState);

        this.closeRemovePedido();
      });
    } else {
      this.closeRemovePedido();
    }
  }

  public close() {
    this.openedCadPedido = false;
    this.resourceService.read(this.gridState);
  }

  public opemNewPedido(e) {
    this.close();
    setTimeout(() => {
      this.opem({ isNew: true, dataItem: undefined });
    }, 500);
  }

  // public rowCallback(context: RowClassArgs) {
  //   console.log(context.dataItem.PedidoTipoPedido);
  //   return {
  //     cancel: context.dataItem.PedidoTipoPedido === 5,
  //     venda: context.dataItem.PedidoTipoPedido === 4,
  //     orcamento: context.dataItem.PedidoTipoPedido === 6,
  //     consig: context.dataItem.PedidoTipoPedido === 1,
  //   };
  // }

  public colorCode(code: number): SafeStyle {
    let result;
    switch (code) {
      case 6:
        result = 'text-primary';
        break;
      case 5:
        result = 'text-danger';
        break;
      case 4:
        result = 'text-success';
        break;
      case 1:
        result = 'text-warning';
        break;
      default:
        result = 'transparent';
        break;
    }

    return this.sanitizer.bypassSecurityTrustStyle(result);
  }
  public getTipoPedido(cod: number): String {

    return this.tipoPedidoList.find(item => item.PedidoTipoPedido === cod).descricao;

  }

  public opem({ isNew, dataItem }) {
    if (dataItem) {
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
    }
    this.isNew = isNew; // passado como parametro para o form de produto
    this.openedCadPedido = true;
  }

  public closeRemovePedido() {
    this.openedRemovePedido = false;
  }
  public opemRemovePedido() {
    this.openedRemovePedido = true;
  }

  getFormGroupForm(formData: FormData) {
    this.close();
  }


}
const createFormGroup = (dataItem?: Pedido) => {
  if (dataItem) {
    return new FormGroup({
      CanalVendasId: new FormControl(dataItem.CanalVendasId),
      ClienteId: new FormControl(dataItem.ClienteId, [Validators.required]),
      CondicaoPagamentoId: new FormControl(dataItem.CondicaoPagamentoId, [Validators.required]),
      MktPlaceId: new FormControl(dataItem.MktPlaceId),
      PedidoAgendamento: new FormControl(dataItem.PedidoAgendamento),
      PedidoAvaliacao: new FormControl(dataItem.PedidoAvaliacao),
      PedidoBairroCobranca: new FormControl(dataItem.PedidoBairroCobranca),
      PedidoBairroEntrega: new FormControl(dataItem.PedidoBairroEntrega),
      PedidoCPFCNPJ: new FormControl(dataItem.PedidoCPFCNPJ),
      PedidoCaixa: new FormControl(dataItem.PedidoCaixa),
      PedidoRepresentanteId: new FormControl(dataItem.PedidoClienteRepresentante, [Validators.required]), // id do representante
      PedidoCaixaCancelamento: new FormControl(dataItem.PedidoCaixaCancelamento),
      PedidoCanalVendasAumento: new FormControl(dataItem.PedidoCanalVendasAumento),
      PedidoCanalVendasDesconto: new FormControl(dataItem.PedidoCanalVendasDesconto),
      PedidoCepCobranca: new FormControl(dataItem.PedidoCepCobranca),
      PedidoCepEntrega: new FormControl(dataItem.PedidoCepEntrega),
      PedidoChaveAcesso: new FormControl(dataItem.PedidoChaveAcesso),
      PedidoCidadeCobranca: new FormControl(dataItem.PedidoCidadeCobranca),
      PedidoCidadeEntrega: new FormControl(dataItem.PedidoCidadeEntrega),
      PedidoCodigo: new FormControl(dataItem.PedidoCodigo, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      PedidoCubagemFrete: new FormControl(dataItem.PedidoCubagemFrete),
      PedidoDesconto: new FormControl(parseFloat(dataItem.PedidoDesconto).toFixed(2), [Validators.pattern(/^[\d,.?!]+$/)]),
      PedidoDescontoValor: new FormControl(dataItem.PedidoDescontoValor),
      PedidoEmissao: new FormControl(new Date(dataItem.PedidoEmissao), [Validators.required]),
      PedidoEmpcod: new FormControl(dataItem.PedidoEmpcod),
      PedidoEmpresaId: new FormControl(dataItem.PedidoEmpresaId),
      PedidoEnderecoCobranca: new FormControl(dataItem.PedidoEnderecoCobranca),
      PedidoEnderecoEntrega: new FormControl(dataItem.PedidoEnderecoEntrega),
      PedidoId: new FormControl(dataItem.PedidoId),
      PedidoIdMktPlace: new FormControl(dataItem.PedidoIdMktPlace),
      PedidoLiberacaoData: new FormControl(dataItem.PedidoLiberacaoData),
      PedidoLiberacaoFaturamentoData: new FormControl(dataItem.PedidoLiberacaoFaturamentoData),
      PedidoLiberacaoFaturamentoHora: new FormControl(dataItem.PedidoLiberacaoFaturamentoHora),
      PedidoLiberacaoFaturamentoStatus: new FormControl(dataItem.PedidoLiberacaoFaturamentoStatus),
      PedidoLiberacaoFaturamentoUsuario: new FormControl(dataItem.PedidoLiberacaoFaturamentoUsuario),
      PedidoLiberacaoHora: new FormControl(dataItem.PedidoLiberacaoHora),
      PedidoLiberacaoObs: new FormControl(dataItem.PedidoLiberacaoObs),
      PedidoLiberacaoUsuario: new FormControl(dataItem.PedidoLiberacaoUsuario),
      PedidoNomeCobranca: new FormControl(dataItem.PedidoNomeCobranca),
      PedidoNomeEntrega: new FormControl(dataItem.PedidoNomeEntrega),
      PedidoNotaFiscalId: new FormControl(dataItem.PedidoNotaFiscalId),
      PedidoNroOrcamento: new FormControl(dataItem.PedidoNroOrcamento),
      PedidoObsComercial: new FormControl(dataItem.PedidoObsComercial),
      PedidoObsInterna: new FormControl(dataItem.PedidoObsInterna),
      PedidoObsPrazoEntrega: new FormControl(dataItem.PedidoObsPrazoEntrega),
      PedidoOrcamento: new FormControl(dataItem.PedidoOrcamento),
      PedidoPedidoCliente: new FormControl(dataItem.PedidoPedidoCliente),
      PedidoPesoFrete: new FormControl(dataItem.PedidoPesoFrete),
      PedidoTipoEntrega: new FormControl(dataItem.PedidoTipoEntrega),
      PedidoTipoFrete: new FormControl(dataItem.PedidoTipoFrete),
      PedidoTipoPedido: new FormControl(dataItem.PedidoTipoPedido),
      PedidoTransportadora: new FormControl(dataItem.PedidoTransportadora, [Validators.required]),
      PedidoUFCobranca: new FormControl(dataItem.PedidoUFCobranca),
      PedidoUFEntrega: new FormControl(dataItem.PedidoUFEntrega),
      PedidoValorFrete: new FormControl(dataItem.PedidoValorFrete),
      PedidoliberacaoFaturamentoObs: new FormControl(dataItem.PedidoliberacaoFaturamentoObs),
      TabelaPrecoId: new FormControl(dataItem.TabelaPrecoId, [Validators.required]),
      TipoCobrancaId: new FormControl(dataItem.TipoCobrancaId, [Validators.required]),
      PedidoPendente: new FormControl(dataItem.PedidoPendente),

      // para passar o total do pedido para o form
      PedidoTotalValor: new FormControl(dataItem.PedidoTotalValor)
    }
    );
  } else {
    return new FormGroup({
      CanalVendasId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteId: new FormControl('', [Validators.required]),
      CondicaoPagamentoId: new FormControl('', [Validators.required]),
      MktPlaceId: new FormControl('MAGAZINELUIZA'),
      PedidoAgendamento: new FormControl('0000-00-00'),
      PedidoAvaliacao: new FormControl(0),
      PedidoBairroCobranca: new FormControl(''),
      PedidoBairroEntrega: new FormControl(''),
      PedidoCPFCNPJ: new FormControl(''),
      PedidoCaixa: new FormControl(''),
      PedidoCaixaCancelamento: new FormControl(''),
      PedidoCanalVendasAumento: new FormControl(0),
      PedidoCanalVendasDesconto: new FormControl(0),
      PedidoCepCobranca: new FormControl(''),
      PedidoCepEntrega: new FormControl(''),
      PedidoChaveAcesso: new FormControl(''),
      PedidoCidadeCobranca: new FormControl(''),
      PedidoRepresentanteId: new FormControl('', [Validators.required]),
      PedidoCidadeEntrega: new FormControl(''),
      PedidoCodigo: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      PedidoCubagemFrete: new FormControl(''),
      PedidoDesconto: new FormControl('', [Validators.pattern(/^[\d,.?!]+$/)]),
      PedidoDescontoValor: new FormControl(''),
      PedidoEmissao: new FormControl(new Date(), [Validators.required]),
      PedidoEmpcod: new FormControl(0),
      PedidoEmpresaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoEnderecoCobranca: new FormControl(''),
      PedidoEnderecoEntrega: new FormControl(''),
      PedidoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoIdMktPlace: new FormControl(''),
      PedidoLiberacaoData: new FormControl('0000-00-00T00:00:00'),
      PedidoLiberacaoFaturamentoData: new FormControl('0000-00-00T00:00:00'),
      PedidoLiberacaoFaturamentoHora: new FormControl(''),
      PedidoLiberacaoFaturamentoStatus: new FormControl(0),
      PedidoLiberacaoFaturamentoUsuario: new FormControl(''),
      PedidoLiberacaoHora: new FormControl(''),
      PedidoLiberacaoObs: new FormControl(''),
      PedidoLiberacaoUsuario: new FormControl(''),
      PedidoNomeCobranca: new FormControl(''),
      PedidoNomeEntrega: new FormControl(''),
      PedidoNotaFiscalId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoNroOrcamento: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoObsComercial: new FormControl(''),
      PedidoObsInterna: new FormControl(''),
      PedidoObsPrazoEntrega: new FormControl(''),
      PedidoOrcamento: new FormControl(0),
      PedidoPedidoCliente: new FormControl(''),
      PedidoPesoFrete: new FormControl(''),
      PedidoTipoEntrega: new FormControl('rna'),
      PedidoTipoFrete: new FormControl('cif'),
      PedidoTipoPedido: new FormControl(4),
      PedidoTransportadora: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoUFCobranca: new FormControl(''),
      PedidoUFEntrega: new FormControl(''),
      PedidoValorFrete: new FormControl(''),
      PedidoliberacaoFaturamentoObs: new FormControl(''),
      PedidoPendente: new FormControl(true),
      TabelaPrecoId: new FormControl('', [Validators.required]), // guid '00000000-0000-0000-0000-000000000000'
      TipoCobrancaId: new FormControl('', [Validators.required]),
    });
  }
};
