import { useEffect, useMemo, useState } from "react";
import { GetProductsUseCase } from "../../application/GetProductsUseCase";
import { ProductApiRepository } from "../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../infrastructure/cache/LocalStorageCache";
import type { Product } from "../../domain/Product";
import { dictionary } from "../../../../shared/i18n/en";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProductsUseCase = useMemo(
    () =>
      new GetProductsUseCase(
        new ProductApiRepository(
          new LocalStorageCache()
        )
      ),
    []
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);

        const data =
          await getProductsUseCase.execute();

        setProducts(data);

      } catch (err) {
        console.error("Failed to load products", err);

        setError(
          err instanceof Error
            ? err.message
            : dictionary.productList.error
        );

      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [getProductsUseCase]);

  return {
    products,
    isLoading,
    error,
  };
}