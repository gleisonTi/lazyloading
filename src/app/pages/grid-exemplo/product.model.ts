export class Product {
  public ProductID: number;
  public ProductName = '';
  public Discontinued = false;
  public UnitsInStock: number;
  public UnitPrice = 0;

  static fromJson(jsonData: any): Product {
    return Object.assign(new Product(), jsonData);
  }
}
