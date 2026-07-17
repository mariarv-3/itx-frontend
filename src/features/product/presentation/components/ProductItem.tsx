import { Link } from 'react-router-dom';
import type { Product } from '../../domain/Product';
import { dictionary } from '../../../../shared/i18n/en';
import styles from './ProductItem.module.css';

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.imageUrl} 
          alt={`${product.brand} ${product.model}`} 
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div>
          <h2 className={styles.brand}>{product.brand}</h2>
          <h3 className={styles.model}>{product.model}</h3>
        </div>
        <div>
          {product.price !== null ? (
            <p className={styles.price}>{product.price}€</p>
          ) : (
            <p className={styles.priceFallback}>{dictionary.productItem.priceUnavailable}</p>
          )}
        </div>
      </div>
    </Link>
  );
};
