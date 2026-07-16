import type { Product, ProductDetail } from "./Product";

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<ProductDetail>;
}