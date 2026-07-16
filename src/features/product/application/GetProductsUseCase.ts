import type { Product } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(): Promise<Product[]> {
    return this.repository.getProducts();
  }
}
