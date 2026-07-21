import { ProductItem } from "../../../components/ProductItem";
import { EmptyState } from "../../../../../../shared/components/EmptyState";
import { dictionary } from "../../../../../../shared/i18n/en";
import type { Product } from "../../../../domain/Product";
import styles from "../ProductListPage.module.css";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
}

export const ProductGrid = ({ products, searchQuery }: ProductGridProps) => {
  return (
    <div className={styles.grid}>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            isPriority={index < 12}
          />
        ))
      ) : (
        <EmptyState
          title={dictionary.productList.noResultsTitle}
          description={dictionary.productList.noResultsDesc(searchQuery)}
        />
      )}
    </div>
  );
};
