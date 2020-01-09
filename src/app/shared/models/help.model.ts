export class Help {
  constructor(
    public helpId?: number,
    public helpIdentificador?: string,
    public helpTipo?: string,
    public Seguimento ?: string,
    public helpTexto?: string,
  ) {
  }
  static fromJson(jsonData: any): Help {
    return Object.assign(new Help(), jsonData);
  }
}
