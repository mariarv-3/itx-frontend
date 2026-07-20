import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ProductItem } from "../../components/ProductItem";
import { SearchBar } from "../../components/SearchBar";
import { Header } from "../../../../../shared/components/Header";
import { Skeleton } from "../../../../../shared/components/Skeleton";
import { EmptyState } from "../../../../../shared/components/EmptyState";
import { dictionary } from "../../../../../shared/i18n/en";
import styles from "./ProductListPage.module.css";

const SKELETON_COUNT = 8;

export function ProductListPage() {
  const { products, isLoading, error } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter(
      (product) =>
        product.brand.toLowerCase().includes(query) ||
        product.model.toLowerCase().includes(query)
    );
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
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
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