import { RegistrarComponent } from './core/components/registrar/registrar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './core/components/default-layout/default-layout.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/Authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pedido',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent, canActivate: [AuthGuard],
     //component: DefaultLayoutComponent,
    data: {
      title: 'Início'
    },
    children: [
      {
        path: 'agenda',
        loadChildren: './pages/basico/agenda/agenda.module#AgendaModule',
        data: {
          title: 'Agenda'
        }
      },
      {
        path: 'variacao',
        loadChildren: './pages/basico/variacao/variacao.module#VariacaoModule',
        data: {
          title: 'Variação'
        },
      },
      {
        path: 'atributo',
        loadChildren: './pages/basico/atributo/atributo.module#AtributoModule',
        data: {
          title: 'Atributo'
        },
      },
      {
        path: 'produto',
        loadChildren: './pages/basico/produto/produto.module#ProdutoModule',
        data: {
          title: 'Produto'
        },
      },
      {
        path: 'referencia',
        loadChildren: './pages/basico/referencia/referencia.module#ReferenciaModule',
        data: {
          title: 'Referência '
        },
      },
      {
        path: 'grade',
        loadChildren: './pages/basico/grade/grade.module#GradeModule',
        data: {
          title: 'Grade'
        },
      },
      {
        path: 'grupo',
        loadChildren: './pages/basico/grupo/grupo.module#GrupoModule',
        data: {
          title: 'Grupo'
        },
      },
      {
        path: 'cliente',
        loadChildren: './pages/basico/cliente/cliente.module#ClienteModule',
        data: {
          title: 'Cliente'
        },
      },
      {
        path: 'pedido',
        loadChildren: './pages/basico/pedido/pedido.module#PedidoModule',
        data: {
          title: 'Pedido'
        },
      },
      /*{
        path: 'variacaoMkt',
        loadChildren: './pages/marketplace/variacao-mkt/variacao-mkt.module#VariacaoMktModule',
        data: {
          title: 'Variação Market Place'
        },
      },*/
      {
        path: 'setor',
        loadChildren: './pages/basico/setor/setor.module#SetorModule',
        data: {
          title: 'Setor'
        },
      },
      {
        path: 'componente',
        loadChildren: './pages/basico/componente/componente.module#ComponenteModule',
        data: {
          title: 'Componente'
        },
      },
      {
        path: 'variacaoimagem',
        loadChildren: './pages/basico/variacao-imagem/variacao-imagem.module#VariacaoImagemModule',
        data: {
          title: 'Variação Imagem'
        },
      },
      {
        path: 'colecao',
        loadChildren: './pages/basico/colecao/colecao.module#ColecaoModule',
        data: {
          title: 'Coleção'
        },
      },
      {
        path: 'fabricante',
        loadChildren: './pages/basico/fabricante/fabricante.module#FabricanteModule',
        data: {
          title: 'Fabricante'
        },
      },
      {
        path: 'tamanho',
        loadChildren: './pages/basico/tamanho/tamanho.module#TamanhoModule',
        data: {
          title: 'Tamanho'
        },
      },
      {
        path: 'unidade',
        loadChildren: './pages/basico/unidade/unidade.module#UnidadeModule',
        data: {
          title: 'Unidade'
        },
      },
      {
        path: 'despesa',
        loadChildren: './pages/basico/despesa/despesa.module#DespesaModule',
        data: {
          title: 'Despesa'
        },
      },
      {
        path: 'area',
        loadChildren: './pages/basico/area/area.module#AreaModule',
        data: {
          title: 'Área de atuação'
        },
      },
      {
        path: 'embalagem',
        loadChildren: './pages/basico/embalagem/embalagem.module#EmbalagemModule',
        data: {
          title: 'Embalagem'
        },
      },
      {
        path: 'banco',
        loadChildren: './pages/basico/banco/banco.module#BancoModule',
        data: {
          title: 'Bancos'
        },
      },
      {
        path: 'tipoestoque',
        loadChildren: './pages/basico/tipo-estoque/tipo-estoque.module#TipoEstoqueModule',
        data: {
          title: 'Tipos de Estoque'
        },
      },
      {
        path: 'tipocobranca',
        loadChildren: './pages/basico/tipo-cobranca/tipo-cobranca.module#TipoCobrancaModule',
        data: {
          title: 'Tipo de Cobrança'
        },
      },
      {
        path: 'tabelapreco',
        loadChildren: './pages/basico/tabela-preco/tabela-preco.module#TabelaPrecoModule',
        data: {
          title: 'Tabela de Preço'
        },
      },
      {
        path: 'tabelaprecoproduto',
        loadChildren: './pages/basico/tabela-preco-produto/tabela-preco-produto.module#TabelaPrecoProdutoModule',
        data: {
          title: 'Tabela de Preço dos produtos'
        },
      },
      {
        path: 'condicaopagamento',
        loadChildren: './pages/basico/condicao-pagamento/condicao-pagamento.module#CondicaoPagamentoModule',
        data: {
          title: 'Condição Pagamento'
        },
      },
      {
        path: 'categoria',
        loadChildren: './pages/marketPlace/categoria/categoria.module#CategoriaModule',
        data: {
          title: 'Categoria'
        },
      },
      {
        path: 'atributosmeli',
        loadChildren:'./pages/marketPlace/atributo-mkt/atributo-mkt.module#AtributoMktModule',
        data: {
          title: 'Atributos ML'
        }
      },
      {
        path: 'atributosintegra',
        loadChildren:'./pages/marketPlace/atributo-mkt/atributo-mkt.module#AtributoMktModule',
        data: {
          title: 'Atributos Integra'
        }
      },
      {
        path: 'atributosirroba',
        loadChildren:'./pages/marketPlace/atributo-mkt/atributo-mkt.module#AtributoMktModule',
        data: {
          title: 'Atributos Irroba'
        }
      },
      {
        path: 'atributosnetshoes',
        loadChildren:'./pages/marketPlace/atributo-mkt/atributo-mkt.module#AtributoMktModule',
        data: {
          title: 'Atributos Netshoes'
        }
      },
      {
        path: 'atributosb2w',
        loadChildren:'./pages/marketPlace/atributo-mkt/atributo-mkt.module#AtributoMktModule',
        data: {
          title: 'Atributos B2W'
        }
      },
      {
        path: 'referenciasmeli',
        loadChildren:'./pages/marketPlace/referencia-mkt/referencia-mkt.module#ReferenciaMktModule',
        data: {
          title: 'Referências ML'
        }
      },
    ]
  },
  {
    path: 'referenciamkt',
    loadChildren: './pages/marketPlace/referencia-mkt/referencia-mkt.module#ReferenciaMktModule',
    data: {
      title: 'Referência '
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'registrar',
    loadChildren: './core/components/registrar/registrar.module#RegistrarModule',
    data: {
      title: 'Registrar'
    }
  }

];

//{ path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
