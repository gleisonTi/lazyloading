import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class VariacaoConsumo extends BaseResourceModel {
  constructor(
    public VariacaoConsumoId?: string,
    public VariacaoId?: string,
    public ComponenteId?: string,
    public ComponenteDescricao?: string,
    public ProdutoId?: string,
    public ProdutoDescricao?: string,
    public UnidadeId?: string,
    public VariacaoConsumoUsuario?: string,
    public VariacaoConsumoData?: string,
    public VariacaoConsumoQuantidade?: string,
    public SetorId?: string,
    public SetorDescricao?: string,
    ) {
    super();
    console.log('model :',this.VariacaoConsumoId);
    this.id = this.VariacaoConsumoId
  }

  static fromJson(jsonData: any): VariacaoConsumo {
    return Object.assign(new VariacaoConsumo(jsonData.VariacaoConsumoId), jsonData);
  }
}
