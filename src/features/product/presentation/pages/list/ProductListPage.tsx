import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../../domain/Product";
import { ProductApiRepository } from "../../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../../infrastructure/cache/LocalStorageCache";
import { GetProductsUseCase } from "../../../application/GetProductsUseCase";
import { ProductItem } from "../../components/ProductItem";
import { SearchBar } from "../../components/SearchBar";
import { Header } from "../../../../../shared/components/Header";
import { Skeleton } from "../../../../../shared/components/Skeleton";
import { EmptyState } from "../../../../../shared/components/EmptyState";
import { dictionary } from "../../../../../shared/i18n/en";
import styles from "./ProductListPage.module.css";

export function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProductsUseCase = useMemo(() => {
    return new GetProductsUseCase(
      new ProductApiRepository(new LocalStorageCache())
    );
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProductsUseCase.execute();
        setProducts(data);
      } catch (err: unknown) {
        console.error("Error al cargar productos:", err);
        setError(err instanceof Error ? err.message : dictionary.productList.error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [getProductsUseCase]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return products;
    }

    return products.filter((product) =>
      product.brand.toLowerCase().includes(query) ||
      product.model.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <>
      <Header />

      <main className={styles.container}>
        {isLoading ? (
          <>
            <div className={styles.topBar}>
              <Skeleton width="100%" height="40px" borderRadius="8px" className={styles.searchSkeleton} />
            </div>
            <div className={styles.grid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <Skeleton width="100%" height="280px" borderRadius="12px" />
                </div>
              ))}
            </div>
          </>
        ) : error ? (
          <EmptyState title={dictionary.productList.error} description={error} />
        ) : (
          <>
            <div className={styles.topBar}>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className={styles.grid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
              ) : (
                <EmptyState 
                  title={dictionary.productList.noResultsTitle} 
                  description={dictionary.productList.noResultsDesc(searchQuery)} 
                />
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}