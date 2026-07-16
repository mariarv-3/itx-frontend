import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../domain/Product";
import { ProductApiRepository } from "../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../infrastructure/cache/LocalStorageCache";
import { GetProductsUseCase } from "../../application/GetProductsUseCase";
import { ProductItem } from "../components/ProductItem";
import { SearchBar } from "../components/SearchBar";
import { Header } from "../../../../shared/components/Header";
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
      } catch (err: any) {
        console.error("Error al cargar productos:", err);
        setError(err.message || "Ocurrió un error inesperado");
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
          <div className={styles.message}>Loading products...</div>
        ) : error ? (
          <div className={styles.message}>Error: {error}</div>
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
                <div className={`${styles.message} ${styles.empty}`}>
                  No products found matching "{searchQuery}"
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}