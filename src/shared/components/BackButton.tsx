import { Link } from "react-router-dom";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  to: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function BackButton({ to, label, onClick }: BackButtonProps) {
  return (
    <Link to={to} className={styles.back} onClick={onClick}>
      <span className={styles.backArrow} aria-hidden="true">←</span>
      {label}
    </Link>
  );
}
