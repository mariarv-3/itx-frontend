import type { ProductRepository } from "../domain/ProductRepository";
import type { Product } from "../domain/Product";
import { mapProduct } from "./ProductMapper";
import type { ProductApiResponse } from "./ProductApiResponse";

const API_URL = "https://itx-frontend-test.onrender.com";
const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hora en milisegundos

interface CacheItem<T> {
  timestamp: number;
  data: T;
}

export class ProductApiRepository implements ProductRepository {
  private getCache<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const parsed: CacheItem<T> = JSON.parse(cached);
      if (Date.now() - parsed.timestamp > CACHE_EXPIRATION_MS) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.data;
    } catch (e) {
      console.error('Error reading from cache', e);
      return null;
    }
  }

  private setCache<T>(key: string, data: T): void {
    try {
      const cacheItem: CacheItem<T> = {
        timestamp: Date.now(),
        data,
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (e) {
      console.error('Error writing to cache', e);
    }
  }

  async getProducts(): Promise<Product[]> {
    const cacheKey = "CACHE_PRODUCTS_LIST";
    const cachedData = this.getCache<ProductApiResponse[]>(cacheKey);

    if (cachedData) {
      console.log('Serving products list from cache');
      return cachedData.map(mapProduct);
    }

    console.log('Fetching products list from API');
    const response = await fetch(`${API_URL}/api/product`);
    if (!response.ok) throw new Error('Failed to fetch products');
    
    const data: ProductApiResponse[] = await response.json();
    this.setCache(cacheKey, data);

    return data.map(mapProduct);
  }

  async getProduct(id: string): Promise<Product> {
    const cacheKey = `CACHE_PRODUCT_${id}`;
    const cachedData = this.getCache<ProductApiResponse>(cacheKey);

    if (cachedData) {
      console.log(`Serving product ${id} from cache`);
      return mapProduct(cachedData);
    }

    console.log(`Fetching product ${id} from API`);
    const response = await fetch(`${API_URL}/api/product/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product ${id}`);

    const data: ProductApiResponse = await response.json();
    this.setCache(cacheKey, data);

    return mapProduct(data);
  }
}