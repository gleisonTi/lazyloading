interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    title: true,
    name: 'Funcionalidades'
  },
  {
    name: 'Pedidos',
    url: '/pedido',
    icon: 'icon-basket-loaded'
  },
  { // não alterar estrutua, pois o filtro funciona a partir da posição do objeto
    name: 'Cadastros Basicos',
    url: '',
    icon: 'icon-note',
    children: [
      {
        name: 'Agenda',
        url: '/agenda',
        icon: ''
      },
      {
        name: 'Áreas de atuação',
        url: '/area',
        icon: ''
      },
      {
        name: 'Atributos',
        url: '/atributo',
        icon: ''
      },
      {
        name: 'Bancos',
        url: '/banco',
        icon: ''
      },
      {
        name: 'Coleções',
        url: '/colecao',
        icon: ''
      },

      {
        name: 'Clientes',
        url: '/cliente',
        icon: ''
      },
      {
        name: 'Componentes',
        url: '/componente',
        icon: ''
      },
      {
        name: 'Condições de Pagamento',
        url: '/condicaopagamento',
        icon: ''
      },
      {
        name: 'Despesas',
        url: '/despesa',
        icon: ''
      },
      {
        name: 'Embalagens',
        url: '/embalagem',
        icon: ''
      },
      {
        name: 'Fabricantes',
        url: '/fabricante',
        icon: ''
      },
      {
        name: 'Grades',
        url: '/grade',
        icon: ''
      },
      {
        name: 'Grupos',
        url: '/grupo',
        icon: ''
      },
      {
        name: 'Produtos',
        url: '/produto',
        icon: '',
      },

      {
        name: 'Referências',
        url: '/referencia',
        icon: ''
      },
      {
        name: 'Setores',
        url: '/setor',
        icon: ''
      },
      {
        name: 'Tipos de Estoque',
        url: '/tipoestoque',
        icon: ''
      },
      {
        name: 'Tipos de Cobrança',
        url: '/tipocobranca',
        icon: ''
      },
      {
        name: 'Tabela de Preços',
        url: '/tabelapreco',
        icon: ''
      },
      {
        name: 'Unidades',
        url: '/unidade',
        icon: ''
      },
      {
        name: 'Variações',
        url: '/variacao',
        icon: '',
      },

    ]
  },
  {
    name: 'Market Places',
    url: '',
    icon: 'icon-pie-chart',
    children: [
      {
        name: 'Categorias',
        url: '/categoria',
        icon: 'icon-puzzle'
      },
      {
        name: 'Atributos ML',
        url: '/atributosmeli',
        icon: 'icon-puzzle'
      },
      {
        name: 'Atributos Integra',
        url: '/atributosintegra',
        icon: 'icon-puzzle'
      },
      {
        name: 'Atributos Irroba',
        url: '/atributosirroba',
        icon: 'icon-puzzle'
      },
      {
        name: 'Atributos Netshoes',
        url: '/atributosnetshoes',
        icon: 'icon-puzzle'
      },
      {
        name: 'Atributos B2W',
        url: '/atributosb2w',
        icon: 'icon-puzzle'
      },
      {
        name: 'Referencias Ml',
        url: '/referenciasmeli',
        icon: 'icon-puzzle'
      }
    ]
  }
  // {
  //   name: 'Categories',
  //   url: '/categories',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Categories',
  //       url: '/categories',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  // {
  //   name: 'Remote',
  //   url: '/remote',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: 'Incca Sistemas',
  //   url: 'http://incca.com.br/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }
];
