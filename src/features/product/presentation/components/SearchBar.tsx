import type { ChangeEvent } from 'react';
import styles from './SearchBar.module.css';
import { dictionary } from '../../../../shared/i18n/en';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="search"
        className={styles.searchInput}
        placeholder={dictionary.searchBar.placeholder}
        value={value}
        onChange={handleChange}
        aria-label={dictionary.searchBar.placeholder}
      />
    </div>
  );
};