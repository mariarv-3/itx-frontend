import { SearchBar } from "../../../components/SearchBar";
import { dictionary } from "../../../../../../shared/i18n/en";
import styles from "../ProductListPage.module.css";

interface ProductSearchPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export const ProductSearchPanel = ({
  searchQuery,
  onSearchChange,
  resultCount,
}: ProductSearchPanelProps) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.searchPanel}>
        <div className={styles.resultsMeta}>
          <span className={styles.resultsCount}>
            {dictionary.productList.resultsCount(resultCount)}
          </span>
          {searchQuery && (
            <span className={styles.resultsHint}>
              {dictionary.productList.filteredBy(searchQuery)}
            </span>
          )}
        </div>
        <div className={styles.searchControls}>
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => onSearchChange("")}
              aria-label={dictionary.productList.clearSearch}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
