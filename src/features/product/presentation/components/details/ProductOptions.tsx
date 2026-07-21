import { dictionary } from "../../../../../shared/i18n/en";
import type { ProductOptions as ProductOptionsType } from "../../../domain/Product";
import { getColorValue } from "../../utils/getColorValue";
import styles from "./ProductOptions.module.css";

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
          <p className={styles.optionLabel}>
            {dictionary.productDetails.colorLabel}
          </p>

          <div className={styles.colorSwatches}>
            {options.colors.map((color) => (
              <button
                key={color.code}
                className={`${styles.swatch} ${
                  currentColor === color.code ? styles.swatchSelected : ""
                }`}
                style={{
                  backgroundColor: getColorValue(color.name),
                }}
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
          <p className={styles.optionLabel}>
            {dictionary.productDetails.storageLabel}
          </p>

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