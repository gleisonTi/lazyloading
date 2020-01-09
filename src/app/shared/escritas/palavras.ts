// Botões

// Mensagens padrões
const teste = 'Deseja confirmar a exuclução #strig#';


export const palavrasBotoes = {
  confirmar: 'Confirmar',
  apagar: 'Apagar',
  editar: 'Editar',
  novo: 'Novo',
  cancelar: 'Cancelar'
};

// Outras
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000'
};

'use strict';
export const marketPlaces: Array<{ MktPlaceId: String, descricao: string }> = [
  { MktPlaceId: 'B2W', descricao: 'B2W' },
  { MktPlaceId: 'DAFITI', descricao: 'DAFITI' },
  { MktPlaceId: 'IRROBA', descricao: 'IRROBA' },
  { MktPlaceId: 'LOJAINTEGRADA', descricao: 'LOJA INTEGRADA' },
  { MktPlaceId: 'MAGAZINELUIZA', descricao: 'MAGAZINE LUIZA' },
  { MktPlaceId: 'MERCADOLIVRE', descricao: 'MERCADO LIVRE' },
  { MktPlaceId: 'NETSHOES', descricao: 'NETSHOES' },
  { MktPlaceId: '', descricao: 'SEM MARKETPLACE' },
];
