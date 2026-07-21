import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useProductDetail } from "../../hooks/useProductDetail";
import { useBreadcrumb } from "../../../../../shared/context/BreadcrumbContext";

import { ProductOptions } from "../../components/details/ProductOptions";
import { ProductSpecs } from "../../components/details/ProductSpecs";

import { useCart } from "../../../../../features/cart/presentation/CartContext";
import { CartApiRepository } from "../../../../../features/cart/infrastructure/CartApiRepository";
import { AddToCartUseCase } from "../../../../../features/cart/application/AddToCartUseCase";

import { Header } from "../../../../../shared/components/Header";
import { Skeleton } from "../../../../../shared/components/Skeleton";
import { EmptyState } from "../../../../../shared/components/EmptyState";
import { dictionary } from "../../../../../shared/i18n/en";
import styles from "./ProductDetailsPage.module.css";

const addToCartUseCase = new AddToCartUseCase(new CartApiRepository());

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { setProductName } = useBreadcrumb();
  const { product, isLoading, error, retryCount, retry } = useProductDetail(id);

  useEffect(() => {
    if (product) {
      setProductName(product.model);
    }
    return () => setProductName(null);
  }, [product, setProductName]);

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);

  const [added, setAdded] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  const currentColor = selectedColor !== null
    ? selectedColor
    : (product?.options.colors?.[0]?.code ?? null);

  const currentStorage = selectedStorage !== null
    ? selectedStorage
    : (product?.options.storages?.[0]?.code ?? null);

  const canAddToCart =
    product !== null &&
    currentColor !== null &&
    currentStorage !== null;

  const handleAddToCart = async () => {
    if (!product || !canAddToCart) return;

    try {
      setCartError(null);

      // API call first
      await addToCartUseCase.execute(product.id, currentColor, currentStorage);

      // Update local state context if successful
      addItem(product, currentColor, currentStorage);

      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (err) {
      setCartError(err instanceof Error ? err.message : dictionary.productDetails.errorAddCart);
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.container}>
        <Link to="/" className={styles.back}>
          <span className={styles.backArrow}>←</span>
          {dictionary.productDetails.back}
        </Link>

        {isLoading && (
          <div className={styles.layout}>
            <div className={styles.imageWrapper}>
              <Skeleton width="100%" height="400px" borderRadius="16px" />
            </div>
            <div className={styles.info}>
              <Skeleton width="150px" height="24px" borderRadius="4px" />
              <div style={{ marginTop: '0.5rem' }}>
                <Skeleton width="80%" height="40px" borderRadius="4px" />
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Skeleton width="100px" height="32px" borderRadius="4px" />
              </div>
              <div style={{ marginTop: '3rem' }}>
                <Skeleton width="100%" height="300px" borderRadius="8px" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <EmptyState
            title={dictionary.productDetails.errorLoad}
            description={error}
            action={retryCount > 0 ? (
              <button type="button" onClick={retry} className={styles.retryButton}>
                {dictionary.productDetails.retry}
              </button>
            ) : undefined}
          />
        )}

        {product && (
          <div className={styles.layout}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <img
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.model}`}
                  className={styles.image}
                  style={{ viewTransitionName: `product-image-${product.id}` }}
                />
              </div>
            </div>

            <div className={styles.info}>
              <p className={styles.brand}>{product.brand}</p>
              <h1 className={styles.model}>{product.model}</h1>
              <div className={styles.divider} />

              {product.price !== null ? (
                <p className={styles.price}>
                  {product.price.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              ) : (
                <p className={styles.priceFallback}>{dictionary.productDetails.priceUnavailable}</p>
              )}

              <ProductOptions
                options={product.options}
                currentColor={currentColor}
                currentStorage={currentStorage}
                onColorSelect={setSelectedColor}
                onStorageSelect={setSelectedStorage}
              />

              <div className={styles.actions}>
                <button
                  className={styles.btnPrimary}
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                >
                  {dictionary.productDetails.addToCart}
                </button>

                {added && <div className={styles.toast}>{dictionary.productDetails.addedSuccess}</div>}
                {cartError && <div className={styles.toastError}>{cartError}</div>}
              </div>

              <ProductSpecs product={product} />

            </div>
          </div>
        )}
      </div>
    </div>
  );
};