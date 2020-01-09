import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { PopupAnchorDirective } from './diretivas/popup.anchor-target.directive';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FabricanteGridComponent } from '../pages/basico/fabricante/fabricante-grid/fabricante-grid.component';
import { ColecaoGridComponent } from '../pages/basico/colecao/colecao-grid/colecao-grid.component';
import { ImagemComponent } from './components/imagem/imagem.component';
import { VariacaoImagemGridComponent } from '../pages/basico/variacao-imagem/variacao-imagem-grid/variacao-imagem-grid.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ProdutoComposicaoGridComponent } from '../pages/basico/produto-composicao/produto-composicao-grid/produto-composicao-grid.component';
import { ProdutoImagemGridComponent } from '../pages/basico/produto-imagem/produto-imagem-grid/produto-imagem-grid.component';
import { ProdutoEstoqueGridComponent } from '../pages/basico/produto-estoque/produto-estoque-grid/produto-estoque-grid.component';
import { ProdutoSkuGridComponent } from '../pages/basico/produto-sku/produto-sku-grid/produto-sku-grid.component';
import { ProdutoConsumoGridComponent } from '../pages/basico/produto-consumo/produto-consumo-grid/produto-consumo-grid.component';
import { WeightConverterPipe } from './pipes/KiloFormaterPipe';
import { TamanhoGridComponent } from '../pages/basico/tamanho/tamanho-grid/tamanho-grid.component';
import { InputFilterComponent } from './components/input-filter/input-filter.component';
import { DropdownlistFilterComponent } from './components/dropdownlist-filter/dropdownlist-filter.component';
import { FormsModule } from '@angular/forms';
import { ProdutoCategoriaGridComponent } from '../pages/marketPlace/produto-categoria/produto-categoria-grid/produto-categoria-grid.component';
import { SubAtributoGridComponent } from '../pages/basico/atributo/sub-atributo-grid/sub-atributo-grid.component';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ReferenciaAtributoGridComponent } from '../pages/basico/referencia-atributo/referencia-atributo-grid/referencia-atributo-grid.component';
import { ReferenciaVariacaoGridComponent } from '../pages/basico/referencia-variacao/referencia-variacao-grid/referencia-variacao-grid.component';
import { ChooseVariacaoComponent } from '../pages/basico/referencia-variacao/choose-variacao/choose-variacao.component';
import { ChooseAtributoComponent } from '../pages/basico/referencia-atributo/choose-atributo/choose-atributo.component';
import { GrupoAtributoGridComponent } from '../pages/basico/grupo-atributo/grupo-atributo-grid/grupo-atributo-grid.component';
import { GrupoVariacaoGridComponent } from '../pages/basico/grupo-variacao/grupo-variacao-grid/grupo-variacao-grid.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ClienteEnderecoGridComponent } from '../pages/basico/cliente-endereco/cliente-endereco-grid/cliente-endereco-grid.component';
import { ClienteEnderecoFormComponent } from '../pages/basico/cliente-endereco/cliente-endereco-form/cliente-endereco-form.component';
import { ClienteRepresentanteGridComponent } from '../pages/basico/cliente-representante/cliente-representante-grid/cliente-representante-grid.component';
import { TipoContatoGridComponent } from '../pages/basico/tipo-contato/tipo-contato-grid/tipo-contato-grid.component';
import { ClienteContatoGridComponent } from '../pages/basico/cliente-contato/cliente-contato-grid/cliente-contato-grid.component';
import { TabelaPrecoComponent } from '../pages/basico/tabela-preco/tabela-preco-grid/tabela-preco.component';
import { TipoCobrancaComponent } from '../pages/basico/tipo-cobranca/tipo-cobranca-grid/tipo-cobranca.component';
import { CondicaoPagamentoGridComponent } from '../pages/basico/condicao-pagamento/condicao-pagamento-grid/condicao-pagamento-grid.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { SetorGridComponent } from '../pages/basico/setor/setor-grid/setor-grid.component';
import { ComponenteGridComponent } from './../pages/basico/componente/componente-grid/component-grid.component';
import { PedidoItemGridComponent } from '../pages/basico/pedido-item/pedido-item-grid/pedido-item-grid.component';
import { TabelaPrecoProdutoGridComponent } from '../pages/basico/tabela-preco-produto/tabela-preco-produto-grid/tabela-preco-produto-grid.component';
import { PedidoItemSearchComponent } from '../pages/basico/pedido-item/pedido-item-search/pedido-item-search.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { HotkeyModule } from 'angular2-hotkeys';
import { DateRangeFilterCellComponentComponent } from './components/date-range-filter-cell-component/date-range-filter-cell-component.component';
import { SelectColumnExcelComponent } from './components/select-column-excel/select-column-excel.component';
import { SearchProdutosComponent } from './components/search-produtos/search-produtos.component';
import { GlobalInputComponent } from './components/global-input/global-input.component';
import { InputFocusDirective } from './diretivas/input-focus.directive';
import { MovEstoqueGridComponent } from '../pages/estoque/mov-estoque/mov-estoque-grid/mov-estoque-grid.component';
import { MovEstoqueQtdeGridComponent } from '../pages/estoque/mov-estoque-qtde/mov-estoque-qtde-grid/mov-estoque-qtde-grid.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>) = null

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    GridModule,
    TourNgBootstrapModule.forRoot(),
    HotkeyModule.forRoot(),
    TooltipModule,
    ExcelModule,
    PDFModule,
    DialogsModule,
    ExcelExportModule,
    ButtonModule,
    PopupModule,
    NgxMaskModule.forRoot(options),
    CurrencyMaskModule,
    InputsModule,
    DropDownListModule,
    LayoutModule,
    FormsModule,
    PopupModule,
    InputsModule,
    DropDownListModule,
    EditorModule,
    DateInputsModule,

  ],
  declarations: [
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    FabricanteGridComponent,
    ColecaoGridComponent,
    VariacaoImagemGridComponent,
    ImagemComponent,
    PopupAnchorDirective,
    TamanhoGridComponent,
    //produto
    ProdutoComposicaoGridComponent,
    ProdutoCategoriaGridComponent,
    ProdutoImagemGridComponent,
    ProdutoEstoqueGridComponent,
    ProdutoSkuGridComponent,
    ProdutoConsumoGridComponent,
    SearchProdutosComponent,
    //atributo
    SubAtributoGridComponent,
    //Pipes
    WeightConverterPipe,
    //filters
    InputFilterComponent,
    DropdownlistFilterComponent,
    DateRangeFilterCellComponentComponent,
    // referência
    ReferenciaAtributoGridComponent,
    ReferenciaVariacaoGridComponent,
    ChooseVariacaoComponent,
    ChooseAtributoComponent,
    // grupo
    GrupoVariacaoGridComponent,
    GrupoAtributoGridComponent,
    //cliente
    ClienteEnderecoGridComponent,
    ClienteEnderecoFormComponent,
    ClienteRepresentanteGridComponent,
    ClienteContatoGridComponent,
    TipoContatoGridComponent,
    // Pedido
    TabelaPrecoComponent,
    TipoCobrancaComponent,
    CondicaoPagamentoGridComponent,
    TabelaPrecoProdutoGridComponent,
    PedidoItemSearchComponent,
    // Setor
    SetorGridComponent,
    // Componente
    ComponenteGridComponent,
    // Tipo de cobrança
    TipoCobrancaComponent,
    // Tabela de Preço
    TabelaPrecoComponent,
    // Condição de pagamento
    CondicaoPagamentoGridComponent,
    PedidoItemGridComponent,
    // Setor
    SetorGridComponent,
    // Componente
    ComponenteGridComponent,
    DateRangeFilterCellComponentComponent,
    SelectColumnExcelComponent,
    SearchProdutosComponent,
    //input global,
    GlobalInputComponent,
    InputFocusDirective,
    //estoque
    MovEstoqueGridComponent,
    MovEstoqueQtdeGridComponent,

  ],
  exports: [
    // shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    GridModule,
    ButtonModule,
    HotkeyModule,
    PopupModule,
    ExcelModule,
    PDFModule,
    InputsModule,
    ExcelExportModule,
    DropDownListModule,
    TourNgBootstrapModule,
    TooltipModule,
    DialogsModule,
    LayoutModule,
    CurrencyMaskModule,
    NgxMaskModule,
    DateInputsModule,
    // shared components
    ProdutoComposicaoGridComponent,
    ProdutoCategoriaGridComponent,
    ProdutoImagemGridComponent,
    ProdutoEstoqueGridComponent,
    ProdutoSkuGridComponent,
    ProdutoConsumoGridComponent,
    ReferenciaAtributoGridComponent,
    ReferenciaVariacaoGridComponent,
    ChooseVariacaoComponent,
    ChooseAtributoComponent,
    SubAtributoGridComponent,
    FabricanteGridComponent,
    PageHeaderComponent,
    TamanhoGridComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    ColecaoGridComponent,
    VariacaoImagemGridComponent,
    ImagemComponent,
    SearchProdutosComponent,
    //filters
    InputFilterComponent,
    DropdownlistFilterComponent,
    DateRangeFilterCellComponentComponent,
    //diretivas
    PopupAnchorDirective,
    //Pipes
    WeightConverterPipe,
    EditorModule,
    // grupo
    GrupoVariacaoGridComponent,
    GrupoAtributoGridComponent,
    //cliente
    ClienteEnderecoGridComponent,
    ClienteEnderecoFormComponent,
    ClienteRepresentanteGridComponent,
    ClienteContatoGridComponent,
    TipoContatoGridComponent,
    // Pedido
    TabelaPrecoComponent,
    TipoCobrancaComponent,
    CondicaoPagamentoGridComponent,
    PedidoItemGridComponent,
    TabelaPrecoProdutoGridComponent,
    PedidoItemSearchComponent,
    // Setor
    SetorGridComponent,
    // Componente
    ComponenteGridComponent,
    // Tipo de Cobrança
    TipoCobrancaComponent,
    // Tabela de preço
    TabelaPrecoComponent,
    // Condição de pagamento
    CondicaoPagamentoGridComponent,
    SelectColumnExcelComponent,
    //input global
    GlobalInputComponent,
    //estoque
    MovEstoqueGridComponent,
    MovEstoqueQtdeGridComponent,
  ]
})
export class SharedModule { }
