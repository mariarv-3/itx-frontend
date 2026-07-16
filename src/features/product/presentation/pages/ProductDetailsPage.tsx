import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ProductDetail } from "../../domain/Product";
import { ProductApiRepository } from "../../infrastructure/ProductApiRepository";
import { LocalStorageCache } from "../../infrastructure/cache/LocalStorageCache";
import { GetProductUseCase } from "../../application/GetProductUseCase";
import { useCart } from "../../../../features/cart/presentation/CartContext";
import { Header } from "../../../../shared/components/Header";
import styles from "./ProductDetailsPage.module.css";

// Color map: IDs (from API) → hex values
const COLOR_MAP: Record<number, string> = {
  1: "#1a1a1a",  // Black
  2: "#ffffff",  // White
  3: "#c0392b",  // Red
  4: "#2980b9",  // Blue
  5: "#27ae60",  // Green
  6: "#f39c12",  // Gold/Yellow
  7: "#8e44ad",  // Purple
  8: "#95a5a6",  // Silver/Grey
  9: "#e67e22",  // Orange
  10: "#16a085", // Teal
};

const getProductUseCase = new GetProductUseCase(
  new ProductApiRepository(new LocalStorageCache())
);

// Specs rows: [label, field key on ProductDetail]
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

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductUseCase.execute(id);
        setProduct(data);
        // Pre-select first available options
        if (data.colors.length > 0) setSelectedColor(data.colors[0]);
        if (data.internalMemory.length > 0) setSelectedStorage(data.internalMemory[0]);
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
    (product.colors.length === 0 || selectedColor !== null) &&
    (product.internalMemory.length === 0 || selectedStorage !== null);

  const handleAddToCart = () => {
    if (!product || !canAddToCart) return;
    addItem(product, selectedColor ?? 0, selectedStorage ?? "");
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const formatSpecValue = (value: ProductDetail[SpecKey]): string | null => {
    if (value === null || value === undefined) return null;
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "number") return String(value);
    return value;
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
          <div className={styles.stateWrapper}>Loading…</div>
        )}

        {error && (
          <div className={styles.stateWrapper}>Error: {error}</div>
        )}

        {product && (
          <div className={styles.layout}>
            {/* ── Image ── */}
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <img
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.model}`}
                  className={styles.image}
                />
              </div>
            </div>

            {/* ── Info ── */}
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

              {/* ── Options ── */}
              <div className={styles.options}>
                {product.colors.length > 0 && (
                  <div>
                    <p className={styles.optionLabel}>Color</p>
                    <div className={styles.colorSwatches}>
                      {product.colors.map((colorId) => (
                        <button
                          key={colorId}
                          className={`${styles.swatch} ${
                            selectedColor === colorId ? styles.swatchSelected : ""
                          }`}
                          style={{
                            backgroundColor: COLOR_MAP[colorId] ?? "#cccccc",
                          }}
                          onClick={() => setSelectedColor(colorId)}
                          aria-label={`Color ${colorId}`}
                          title={`Color ${colorId}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {product.internalMemory.length > 0 && (
                  <div>
                    <p className={styles.optionLabel}>Storage</p>
                    <div className={styles.storageChips}>
                      {product.internalMemory.map((storage) => (
                        <button
                          key={storage}
                          className={`${styles.chip} ${
                            selectedStorage === storage ? styles.chipSelected : ""
                          }`}
                          onClick={() => setSelectedStorage(storage)}
                        >
                          {storage}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Add to cart ── */}
              <div className={styles.actions}>
                <button
                  className={styles.btnPrimary}
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                  </svg>
                  &nbsp;Add to cart
                </button>

                {added && (
                  <div className={styles.toast}>
                    ✓ Added to cart
                  </div>
                )}
              </div>

              {/* ── Specs table ── */}
              <div className={styles.specsSection}>
                <p className={styles.specsTitle}>Specifications</p>
                <div className={styles.specsTable}>
                  {SPEC_GROUPS.map(([label, key]) => {
                    const raw = product[key];
                    const value = formatSpecValue(raw);
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
