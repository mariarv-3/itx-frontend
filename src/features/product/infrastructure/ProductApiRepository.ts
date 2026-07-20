import type { Product, ProductDetail} from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";
import type { ProductApiResponse, ProductDetailApiResponse } from "./ProductApiResponse";
import { LocalStorageCache } from "./cache/LocalStorageCache";
import { API_URL } from "../../../shared/config/api";
import { mapProduct, mapProductDetail } from "./ProductMapper";

export class ProductApiRepository implements ProductRepository {

  private readonly pendingRequests = new Map<string, Promise<unknown>>();


  constructor(
    private readonly cache: LocalStorageCache
  ) {}


  async getProducts(): Promise<Product[]> {

    const cacheKey = "product:list";

    const cached =
      this.cache.get<ProductApiResponse[]>(cacheKey);

    if (cached !== null) {
      return cached.map(mapProduct);
    }


    return this.dedupe(
      cacheKey,
      async () => {

        const data =
          await this.request<ProductApiResponse[]>(
            `${API_URL}/api/product`
          );


        this.cache.set(
          cacheKey,
          data
        );


        return data.map(mapProduct);
      }
    );
  }



  async getProduct(id: string): Promise<ProductDetail> {

    const cacheKey = `product:${id}`;

    const cached = this.cache.get<ProductDetailApiResponse>(cacheKey);


    if (cached !== null) {
      return mapProductDetail(cached);
    }

    return this.dedupe(
      cacheKey,
      async () => {

        const data =
          await this.request<ProductDetailApiResponse>(
            `${API_URL}/api/product/${id}`
          );


        this.cache.set(
          cacheKey,
          data
        );


        return mapProductDetail(data);
      }
    );
  }



  private async request<T>(url: string): Promise<T> {

    const response =
      await fetch(url);


    if (!response.ok) {
      throw new Error(
        `Request failed (${response.status})`
      );
    }


    return response.json() as Promise<T>;
  }



  private dedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {

    const existing =
      this.pendingRequests.get(key);

    if (existing) {
      return existing as Promise<T>;
    }

    const promise =
      fetcher()
        .finally(() => {
          this.pendingRequests.delete(key);
        });

    this.pendingRequests.set(
      key,
      promise
    );

    return promise;
  }
}