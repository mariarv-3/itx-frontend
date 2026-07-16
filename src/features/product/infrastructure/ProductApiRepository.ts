import type { Product } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";
import type { ProductApiResponse } from "./ProductApiResponse";
import { LocalStorageCache } from "./cache/LocalStorageCache";
import { mapProduct } from "./ProductMapper";
import { API_URL } from "../../../shared/config/api";

export class ProductApiRepository implements ProductRepository {
  constructor(
    private readonly cache: LocalStorageCache
  ) {}

  async getProducts(): Promise<Product[]> {
    const cacheKey = "product:list";
    const cached = this.cache.get<ProductApiResponse[]>(cacheKey);

    if (cached) {
      return cached.map(mapProduct);
    }

    const response = await fetch(`${API_URL}/api/product`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }

    const data = (await response.json()) as ProductApiResponse[];

    this.cache.set(cacheKey, data);

    return data.map(mapProduct);
  }

  async getProduct(id: string): Promise<Product> {
    const cacheKey = `product:${id}`;
    const cached = this.cache.get<ProductApiResponse>(cacheKey);

    if (cached) {
      return mapProduct(cached);
    }

    const response = await fetch(`${API_URL}/api/product/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id} (${response.status})`);
    }

    const data = (await response.json()) as ProductApiResponse;

    this.cache.set(cacheKey, data);

    return mapProduct(data);
  }
}