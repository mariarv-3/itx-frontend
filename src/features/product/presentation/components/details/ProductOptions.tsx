import { dictionary } from "../../../../../shared/i18n/en";
import type { ProductOptions as ProductOptionsType } from "../../../domain/Product";
import styles from "./ProductOptions.module.css";

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

interface ProductOptionsProps {
  options: ProductOptionsType;
  currentColor: number | null;
  currentStorage: number | null;
  onColorSelect: (code: number) => void;
  onStorageSelect: (code: number) => void;
}

export const ProductOptions = ({
  options,
  currentColor,
  currentStorage,
  onColorSelect,
  onStorageSelect,
}: ProductOptionsProps) => {
  return (
    <div className={styles.options}>
      {options.colors.length > 0 && (
        <div>
          <p className={styles.optionLabel}>{dictionary.productDetails.colorLabel}</p>
          <div className={styles.colorSwatches}>
            {options.colors.map((color) => (
              <button
                key={color.code}
                className={`${styles.swatch} ${
                  currentColor === color.code ? styles.swatchSelected : ""
                }`}
                style={{ backgroundColor: COLOR_MAP[color.code] ?? "#cccccc" }}
                onClick={() => onColorSelect(color.code)}
                aria-label={color.name}
                aria-pressed={currentColor === color.code}
              />
            ))}
          </div>
        </div>
      )}

      {options.storages.length > 0 && (
        <div>
          <p className={styles.optionLabel}>{dictionary.productDetails.storageLabel}</p>
          <div className={styles.storageChips}>
            {options.storages.map((storage) => (
              <button
                key={storage.code}
                className={`${styles.chip} ${
                  currentStorage === storage.code ? styles.chipSelected : ""
                }`}
                onClick={() => onStorageSelect(storage.code)}
                aria-label={`Storage capacity ${storage.name}`}
                aria-pressed={currentStorage === storage.code}
              >
                {storage.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
