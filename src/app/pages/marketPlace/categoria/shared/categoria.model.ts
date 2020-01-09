import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Categoria extends BaseResourceModel {
  constructor(
    public CategoriaId?: string,
    public CategoriaNome?: string,
    public CategoriaDescricao?: string,
    public CategoriaTitulo?: string,
    public CategoriaMetaDescricao?: string,
    public CategoriaPalavraChave?: string,
    public CategoriaHabilitado?: boolean,
    public CategoriaSubCategoriaNome?: string,
    public CategoriaIcone?: string,
    public CategoriaBanner?: string,
    public CategoriaImagemSubmenu?: string,
    public CategoriaIdMktPlace?: string,
    public CategoriaUsuario?: string,
    public CategoriaData?: Date,
    public CategoriaPaiId?: string,
    public CategoriaExibir?: boolean,
    public CategoriaExibirInformativo?: boolean,
    public CategoriaRetirarLink?: boolean,
    public CategoriaColunas?: string,
    public CategoriaOrdem?: string,
    public CategoriaInativo?: boolean,
    public CategoriaExLateral?: boolean,
    public CategoriaEstoque?: boolean,
    public MktPlaceId?: string
  ) {
    super();
    this.id = this.CategoriaId;
  }
  static fromJson(jsonData: any): Categoria {
    return Object.assign(new Categoria(jsonData.CategoriaId), jsonData);
  }
}
