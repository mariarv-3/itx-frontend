import type { ProductDetail } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

export class GetProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(id: string): Promise<ProductDetail> {
    return this.repository.getProduct(id);
  }
}
