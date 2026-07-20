import { Link } from 'react-router-dom';
import type { Product } from '../../domain/Product';
import { dictionary } from '../../../../shared/i18n/en';
import styles from './ProductItem.module.css';

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => (
  <Link
    to={`/product/${product.id}`}
    className={styles.card}
    aria-label={`${product.brand} ${product.model}`}
  >
    <div className={styles.imageContainer}>
      <img
        src={product.imageUrl}
        alt={`${product.brand} ${product.model}`}
        className={styles.image}
        style={{
          viewTransitionName: `product-image-${product.id}`,
        }}
        loading="lazy"
      />
    </div>

    <div className={styles.content}>
      <div className={styles.info}>
        <h2 className={styles.brand}>
          {product.brand}
        </h2>

        <p className={styles.model}>
          {product.model}
        </p>
      </div>

      <div className={styles.footer}>
        {product.price !== null ? (
          <p className={styles.price}>
            {product.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        ) : (
          <p className={styles.priceFallback}>
            {dictionary.productItem.priceUnavailable}
          </p>
        )}
      </div>
    </div>
  </Link>
);
