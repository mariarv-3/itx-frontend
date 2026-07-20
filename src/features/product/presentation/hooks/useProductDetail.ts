import { useEffect, useMemo, useState } from "react";
import type { ProductDetail } from "../../domain/Product";
import { GetProductUseCase } from "../../application/GetProductUseCase";
import { ProductApiRepository } from "../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../infrastructure/cache/LocalStorageCache";

export function useProductDetail(id: string | undefined) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    if (!id) {
      setIsLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductUseCase.execute(id);

        setProduct(data);

      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );

      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();

  }, [id, getProductUseCase]);

  return {
    product,
    isLoading,
    error,
  };
}