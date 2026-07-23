import { useMemo, useState } from "react";
import { useDebounce } from "../../../../../shared/hooks/useDebounce";
import { useProducts } from "../../hooks/useProducts";

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
  const debouncedQuery = useDebounce(searchQuery, 300);
  const isSearching = searchQuery !== debouncedQuery;

  const filteredProducts = useMemo(() => {
    return filterProductsByQuery(products, debouncedQuery);
  }, [products, debouncedQuery]);

  if (isLoading) {
    return (
      <main className={styles.container} aria-busy="true" aria-live="polite">
        <span className="visually-hidden">{dictionary.productList.loading}</span>
        <ProductListSkeleton />
      </main>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <main className={styles.container}>
      <ProductSearchPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredProducts.length}
      />
      <ProductGrid
        products={filteredProducts}
        searchQuery={searchQuery}
        isSearching={isSearching}
      />
    </main>
  );
}