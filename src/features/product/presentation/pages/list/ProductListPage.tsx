import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Header } from "../../../../../shared/components/Header";
import { EmptyState } from "../../../../../shared/components/EmptyState";
import { dictionary } from "../../../../../shared/i18n/en";
import type { Product } from "../../../domain/Product";
import { ProductListSkeleton } from "./components/ProductListSkeleton";
import { ProductSearchPanel } from "./components/ProductSearchPanel";
import { ProductGrid } from "./components/ProductGrid";
import styles from "./ProductListPage.module.css";

const normalizeQuery = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const filterProductsByQuery = (products: Product[], query: string) => {
  const normalizedQuery = normalizeQuery(query);

  if (!normalizedQuery) {
    return products;
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    const searchableText = normalizeQuery(`${product.brand} ${product.model}`);

    return terms.every((term) => searchableText.includes(term));
  });
};

export function ProductListPage() {
  const { products, isLoading, error, retryCount, retry } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return filterProductsByQuery(products, searchQuery);
  }, [products, searchQuery]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <ProductListSkeleton />
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <EmptyState
            title={dictionary.productList.error}
            description={error}
            action={retryCount > 0 ? (
              <button type="button" onClick={retry} className={styles.retryButton}>
                {dictionary.productDetails.retry}
              </button>
            ) : undefined}
          />
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <ProductSearchPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredProducts.length}
        />
        <ProductGrid
          products={filteredProducts}
          searchQuery={searchQuery}
        />
      </main>
    </>
  );
}