import type { Product } from "./Product";

export interface ProductRepository {
  getProducts(): Promise<Product[]>;

  getProduct(id: string): Promise<Product>;
}