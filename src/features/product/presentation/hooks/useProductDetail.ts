import { useEffect, useMemo, useState } from "react";
import type { ProductDetail } from "../../domain/Product";
import { GetProductUseCase } from "../../application/GetProductUseCase";
import { ProductApiRepository } from "../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../infrastructure/cache/LocalStorageCache";

export function useProductDetail(id: string | undefined) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const getProductUseCase = useMemo(
    () =>
      new GetProductUseCase(
        new ProductApiRepository(
          new LocalStorageCache()
        )
      ),
    []
  );

  useEffect(() => {
    let isActive = true;

    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(null);

      setError(null);

      setIsLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductUseCase.execute(id);

        if (!isActive) {
          return;
        }

        setProduct(data);
      } catch (err) {
        if (!isActive) {
          return;
        }

        setRetryCount((current) => current + 1);
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      isActive = false;
    };
  }, [id, getProductUseCase, reloadKey]);

  const retry = () => {
    setRetryCount((current) => current + 1);
    setReloadKey((current) => current + 1);
  };

  return {
    product,
    isLoading,
    error,
    retryCount,
    retry,
  };
}