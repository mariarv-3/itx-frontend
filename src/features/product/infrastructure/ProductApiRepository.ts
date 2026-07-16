import type { Product, ProductDetail } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";
import type { ProductApiResponse, ProductDetailApiResponse } from "./ProductApiResponse";
import { LocalStorageCache } from "./cache/LocalStorageCache";
import { mapProduct, mapProductDetail } from "./ProductMapper";
import { API_URL } from "../../../shared/config/api";

export class ProductApiRepository implements ProductRepository {
  // Deduplicates concurrent requests for the same key so that a single
  // HTTP call is made even when multiple callers ask simultaneously
  // (e.g. React 18 StrictMode double-mount).
  private readonly pendingRequests = new Map<string, Promise<unknown>>();

  constructor(
    private readonly cache: LocalStorageCache
  ) {}

  async getProducts(): Promise<Product[]> {
    const cacheKey = "product:list";
    const cached = this.cache.get<ProductApiResponse[]>(cacheKey);

    if (cached) {
      return cached.map(mapProduct);
    }

    return this.dedupe(cacheKey, async () => {
      const response = await fetch(`${API_URL}/api/product`);

      if (!response.ok) {
        throw new Error(`Failed to fetch products (${response.status})`);
      }

      const data = (await response.json()) as ProductApiResponse[];

      this.cache.set(cacheKey, data);

      return data.map(mapProduct);
    }) as Promise<Product[]>;
  }

  async getProduct(id: string): Promise<ProductDetail> {
    const cacheKey = `product:${id}`;
    const cached = this.cache.get<ProductDetailApiResponse>(cacheKey);

    if (cached) {
      return mapProductDetail(cached);
    }

    return this.dedupe(cacheKey, async () => {
      const response = await fetch(`${API_URL}/api/product/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch product ${id} (${response.status})`);
      }

      const data = (await response.json()) as ProductDetailApiResponse;

      this.cache.set(cacheKey, data);

      return mapProductDetail(data);
    }) as Promise<ProductDetail>;
  }

  private dedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existing = this.pendingRequests.get(key);

    if (existing) {
      return existing as Promise<T>;
    }

    const promise = fetcher().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);

    return promise;
  }
}