import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../features/cart/presentation/CartContext';
import styles from './Header.module.css';

export const Header = () => {
  const location = useLocation();
  const { count } = useCart();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.logo}>
          ITX Store
        </Link>
        <nav className={styles.breadcrumbs}>
          <Link to="/">Home</Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
              <span key={to}>
                {' / '}
                <Link to={to}>{value}</Link>
              </span>
            );
          })}
        </nav>
      </div>

      <div className={styles.cart}>
        <div className={styles.cartIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round" >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
        </div>
        <span>{count}</span>
      </div>
    </header>
  );
};
