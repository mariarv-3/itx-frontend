import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Domain & Application Product
import type { ProductDetail } from "../../domain/Product";
import { ProductApiRepository } from "../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../infrastructure/cache/LocalStorageCache";
import { GetProductUseCase } from "../../application/GetProductUseCase";

// Domain & Application Cart
import { useCart } from "../../../../features/cart/presentation/CartContext";
import { CartApiRepository } from "../../../../features/cart/infrastructure/CartApiRepository";
import { AddToCartUseCase } from "../../../../features/cart/application/AddToCartUseCase";

// Shared
import { Header } from "../../../../shared/components/Header";
import { Skeleton } from "../../../../shared/components/Skeleton";
import { EmptyState } from "../../../../shared/components/EmptyState";
import styles from "./ProductDetailsPage.module.css";

// Color map: IDs from API → hex values
const COLOR_MAP: Record<number, string> = {
  1: "#1a1a1a",
  2: "#ffffff",
  3: "#c0392b",
  4: "#2980b9",
  5: "#27ae60",
  6: "#f39c12",
  7: "#8e44ad",
  8: "#95a5a6",
  9: "#e67e22",
  10: "#16a085",
};

// UseCase initializations
const getProductUseCase = new GetProductUseCase(new ProductApiRepository(new LocalStorageCache()));
const addToCartUseCase = new AddToCartUseCase(new CartApiRepository());

type SpecKey = keyof ProductDetail;

const SPEC_GROUPS: [string, SpecKey][] = [
  ["Network", "networkTechnology"],
  ["Network Speed", "networkSpeed"],
  ["OS", "os"],
  ["CPU", "cpu"],
  ["Chipset", "chipset"],
  ["GPU", "gpu"],
  ["RAM", "ram"],
  ["Display", "displayType"],
  ["Resolution", "displayResolution"],
  ["Size", "displaySize"],
  ["SIM", "sim"],
  ["Dimensions", "dimensions"],
  ["Weight", "weight"],
  ["Battery", "battery"],
  ["WLAN", "wlan"],
  ["Bluetooth", "bluetooth"],
  ["GPS", "gps"],
  ["NFC", "nfc"],
  ["USB", "usb"],
  ["Sensors", "sensors"],
  ["Announced", "announced"],
  ["Status", "status"],
];

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  // Page Loading & Error States
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selector States
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);

  // Cart Operation States
  const [added, setAdded] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductUseCase.execute(id);
        setProduct(data);

        // Auto-select first options if available
        if (data.options.colors.length > 0) {
          setSelectedColor(data.options.colors[0].code);
        }
        if (data.options.storages.length > 0) {
          setSelectedStorage(data.options.storages[0].code);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const canAddToCart =
    product !== null &&
    (product.options.colors.length === 0 || selectedColor !== null) &&
    (product.options.storages.length === 0 || selectedStorage !== null);

  const handleAddToCart = async () => {
    if (!product || !canAddToCart) return;

    try {
      setCartError(null);

      const colorCode = selectedColor ?? 0;
      const storageCode = selectedStorage ?? 0;

      // API call first
      await addToCartUseCase.execute(product.id, colorCode, storageCode);

      // Update local state context if successful
      addItem(product, colorCode, storageCode);

      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (err) {
      setCartError(err instanceof Error ? err.message : "Could not add product to cart");
    }
  };

  const formatSpecValue = (value: ProductDetail[SpecKey]): string | null => {
    if (value === null || value === undefined) return null;
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return null; // Avoid rendering raw option objects as strings

    return String(value);
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.container}>
        <Link to="/" className={styles.back}>
          <span className={styles.backArrow}>←</span>
          Back to all phones
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
        
        {error && <EmptyState title="Error Loading Product Details" description={error} />}

        {product && (
          <div className={styles.layout}>
            {/* Image Section */}
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <img
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.model}`}
                  className={styles.image}
                />
              </div>
            </div>

            {/* Main Info Section */}
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
                <p className={styles.priceFallback}>Price unavailable</p>
              )}

              {/* Purchase Options selectors */}
              <div className={styles.options}>
                {product.options.colors.length > 0 && (
                  <div>
                    <p className={styles.optionLabel}>Color</p>
                    <div className={styles.colorSwatches}>
                      {product.options.colors.map((color) => (
                        <button
                          key={color.code}
                          className={`${styles.swatch} ${
                            selectedColor === color.code ? styles.swatchSelected : ""
                          }`}
                          style={{ backgroundColor: COLOR_MAP[color.code] ?? "#cccccc" }}
                          onClick={() => setSelectedColor(color.code)}
                          aria-label={`Color ${color.name}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {product.options.storages.length > 0 && (
                  <div>
                    <p className={styles.optionLabel}>Storage</p>
                    <div className={styles.storageChips}>
                      {product.options.storages.map((storage) => (
                        <button
                          key={storage.code}
                          className={`${styles.chip} ${
                            selectedStorage === storage.code ? styles.chipSelected : ""
                          }`}
                          onClick={() => setSelectedStorage(storage.code)}
                        >
                          {storage.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Feedback */}
              <div className={styles.actions}>
                <button
                  className={styles.btnPrimary}
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                >
                  Add to cart
                </button>

                {added && <div className={styles.toast}>✓ Added to cart</div>}
                {cartError && <div className={styles.toastError}>{cartError}</div>}
              </div>

              {/* Product Specifications Table */}
              <div className={styles.specsSection}>
                <p className={styles.specsTitle}>Specifications</p>
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

            </div>
          </div>
        )}
      </div>
    </div>
  );
};