import type { Product, ProductDetail } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";
import type { ProductApiResponse, ProductDetailApiResponse } from "./ProductApiResponse";
import { LocalStorageCache } from "./cache/LocalStorageCache";
import { API_URL } from "../../../shared/config/api";
import { API_TIMEOUT_MS } from "../../../shared/config/constants";
import { mapProduct, mapProductDetail } from "./ProductMapper";

export class ProductApiRepository implements ProductRepository {
  private readonly pendingRequests = new Map<string, Promise<unknown>>();
  private readonly retryCount = 2;

  constructor(
    private readonly cache: LocalStorageCache
  ) {}

  async getProducts(): Promise<Product[]> {
    const cacheKey = "product:list";

    const cached = this.cache.get<ProductApiResponse[]>(cacheKey);

    if (cached !== null) {
      return cached.map(mapProduct);
    }

    return this.dedupe(
      cacheKey,
      async () => {
        const data = await this.fetchWithRetry<ProductApiResponse[]>(
          `${API_URL}/api/product`
        );

        this.cache.set(cacheKey, data);

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
        const data = await this.fetchWithRetry<ProductDetailApiResponse>(
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

  private async fetchWithRetry<T>(url: string): Promise<T> {
    let attempt = 0;

    while (attempt <= this.retryCount) {
      const controller = new AbortController();

      try {
        const response = await this.withTimeout(
          fetch(url, { signal: controller.signal }),
          controller,
          "Request timed out"
        );

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        return await this.withTimeout(
          response.json() as Promise<T>,
          controller,
          "Request timed out during JSON parse"
        );
      } catch (error) {
        if (this.isAbortError(error)) {
          if (attempt < this.retryCount) {
            attempt += 1;
            continue;
          }
          throw new Error("Request timed out");
        }

        if (this.isRetryableError(error) && attempt < this.retryCount) {
          attempt += 1;
          continue;
        }

        throw error;
      }
    }

    throw new Error("Request failed");
  }

  private async withTimeout<T>(
    promise: Promise<T>,
    controller: AbortController,
    errorMessage: string
  ): Promise<T> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = globalThis.setTimeout(() => {
        controller.abort();
        const error = new Error(errorMessage);
        error.name = "AbortError"; // Simulate native AbortError behavior to trigger the retry loop
        reject(error);
      }, API_TIMEOUT_MS);
    });

    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    }
  }

  private isRetryableError(error: unknown): boolean {
    return error instanceof TypeError;
  }

  private isAbortError(error: unknown): boolean {
    return error instanceof Error &&
      error.name === "AbortError";
  }

  private dedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existing = this.pendingRequests.get(key);

    if (existing) {
      return existing as Promise<T>;
    }

    const promise = fetcher()
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