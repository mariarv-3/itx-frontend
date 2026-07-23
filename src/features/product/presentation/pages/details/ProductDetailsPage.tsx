import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useProductDetail } from "../../hooks/useProductDetail";
import { useBreadcrumb } from "../../../../../shared/context/BreadcrumbContext";
import { useDocumentTitle } from "../../../../../shared/hooks/useDocumentTitle";

import { ProductOptions } from "../../components/details/ProductOptions";
import { ProductSpecs } from "../../components/details/ProductSpecs";

import { useCart } from "../../../../../features/cart/presentation/CartContext";
import { CartApiRepository } from "../../../../../features/cart/infrastructure/CartApiRepository";
import { AddToCartUseCase } from "../../../../../features/cart/application/AddToCartUseCase";
import { TOAST_DURATION_MS } from "../../../../../shared/config/constants";


import { Skeleton } from "../../../../../shared/components/Skeleton";
import { EmptyState } from "../../../../../shared/components/EmptyState";
import { BackButton } from "../../../../../shared/components/BackButton";
import { dictionary } from "../../../../../shared/i18n/en";
import styles from "./ProductDetailsPage.module.css";

const addToCartUseCase = new AddToCartUseCase(new CartApiRepository());

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { setProductName } = useBreadcrumb();
  const { product, isLoading, error, retryCount, retry } = useProductDetail(id);
  useDocumentTitle(product?.model ?? null);

  useEffect(() => {
    if (product) {
      setProductName(product.model);
    }
    return () => setProductName(null);
  }, [product, setProductName]);

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);

  const [added, setAdded] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const [cartError, setCartError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setSelectedColor(null);
    setSelectedStorage(null);
    setAdded(false);
    setCartError(null);
  }

  const currentColor = selectedColor !== null
    ? selectedColor
    : (product?.options.colors?.[0]?.code ?? null);

  const currentStorage = selectedStorage !== null
    ? selectedStorage
    : (product?.options.storages?.[0]?.code ?? null);

  const hasColors = (product?.options.colors?.length ?? 0) > 0;
  const hasStorages = (product?.options.storages?.length ?? 0) > 0;
  const isOutOfStock = product !== null && (!hasColors || !hasStorages);

  const canAddToCart =
    product !== null &&
    !isOutOfStock &&
    currentColor !== null &&
    currentStorage !== null;

  const handleAddToCart = async () => {
    if (!product || !canAddToCart || isAddingToCart) return;

    try {
      setIsAddingToCart(true);
      setCartError(null);

      await addToCartUseCase.execute(product.id, currentColor, currentStorage);

      addItem(product, currentColor, currentStorage);

      setAdded(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setAdded(false), TOAST_DURATION_MS);
    } catch (err) {
      setCartError(err instanceof Error ? err.message : dictionary.productDetails.errorAddCart);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/" onClick={handleBack} label={dictionary.productDetails.back} />

        {isLoading && (
          <div className={styles.layout} aria-busy="true" aria-live="polite">
            <span className="visually-hidden">{dictionary.productDetails.loading}</span>
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
                  fetchPriority="high"
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
                  disabled={!canAddToCart || isAddingToCart}
                >
                  {isOutOfStock ? dictionary.productDetails.outOfStock : dictionary.productDetails.addToCart}
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