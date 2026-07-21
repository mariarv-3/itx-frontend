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
  const [retryCount, setRetryCount] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

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
    let isActive = true;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductsUseCase.execute();

        if (!isActive) {
          return;
        }

        setProducts(data);
      } catch (err) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load products", err);

        setRetryCount((current) => current + 1);
        setError(
          err instanceof Error
            ? err.message
            : dictionary.productList.error
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      isActive = false;
    };
  }, [getProductsUseCase, reloadKey]);

  const retry = () => {
    setRetryCount((current) => current + 1);
    setReloadKey((current) => current + 1);
  };

  return {
    products,
    isLoading,
    error,
    retryCount,
    retry,
  };
}