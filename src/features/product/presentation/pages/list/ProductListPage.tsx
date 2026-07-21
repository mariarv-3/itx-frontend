import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ProductItem } from "../../components/ProductItem";
import { SearchBar } from "../../components/SearchBar";
import { Header } from "../../../../../shared/components/Header";
import { Skeleton } from "../../../../../shared/components/Skeleton";
import { EmptyState } from "../../../../../shared/components/EmptyState";
import { dictionary } from "../../../../../shared/i18n/en";
import type { Product } from "../../../domain/Product";
import styles from "./ProductListPage.module.css";

const SKELETON_COUNT = 8;

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
          <div className={styles.topBar}>
            <Skeleton
              width="100%"
              height="40px"
              borderRadius="8px"
              className={styles.searchSkeleton}
            />
          </div>

          <div className={styles.grid}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div
                key={index}
                className={styles.skeletonCard}
              >
                <Skeleton
                  width="100%"
                  height="280px"
                  borderRadius="12px"
                />
              </div>
            ))}
          </div>
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
        <div className={styles.topBar}>
          <div className={styles.searchPanel}>
            <div className={styles.resultsMeta}>
              <span className={styles.resultsCount}>
                {dictionary.productList.resultsCount(filteredProducts.length)}
              </span>
              {searchQuery && (
                <span className={styles.resultsHint}>{dictionary.productList.filteredBy(searchQuery)}</span>
              )}
            </div>
            <div className={styles.searchControls}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => setSearchQuery("")}
                  aria-label={dictionary.productList.clearSearch}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <EmptyState
              title={dictionary.productList.noResultsTitle}
              description={dictionary.productList.noResultsDesc(
                searchQuery
              )}
            />
          )}
        </div>
      </main>
    </>
  );
}