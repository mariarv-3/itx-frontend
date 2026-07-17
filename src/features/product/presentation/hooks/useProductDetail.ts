import { useState, useEffect, useMemo } from "react";
import type { ProductDetail } from "../../domain/Product";
import { ProductApiRepository } from "../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../infrastructure/cache/LocalStorageCache";
import { GetProductUseCase } from "../../application/GetProductUseCase";

export function useProductDetail(id: string | undefined) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initializing selected options here to return them is one approach,
  // but typically forms/selectors stay in the component. We will return 
  // raw data and let the component handle its form state, or manage initial
  // states here. For flexibility, we'll just fetch the data here.
  
  const getProductUseCase = useMemo(() => {
    return new GetProductUseCase(
      new ProductApiRepository(new LocalStorageCache())
    );
  }, []);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProductUseCase.execute(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductUseCase]);

  return { product, isLoading, error };
}
