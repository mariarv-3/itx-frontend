import { dictionary } from "../../../../../shared/i18n/en";
import type { ProductDetail } from "../../../domain/Product";
import { SPEC_GROUPS } from "../../constants/productSpecs";
import { formatSpecValue } from "../../utils/formatSpecValue";
import styles from "./ProductSpecs.module.css";

interface ProductSpecsProps {
  product: ProductDetail;
}

export const ProductSpecs = ({ product }: ProductSpecsProps) => {
  return (
    <div className={styles.specsSection}>
      <p className={styles.specsTitle}>{dictionary.productDetails.specsTitle}</p>
      <div className={styles.specsTable}>
        {SPEC_GROUPS.map(([label, key]) => {
          const value = formatSpecValue(product[key]);
          if (!value) return null;

          return (
            <div key={key} className={styles.specRow}>
              <span className={styles.specKey}>{label}</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
