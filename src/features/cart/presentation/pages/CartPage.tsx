import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { EmptyState } from "../../../../shared/components/EmptyState";
import { dictionary } from "../../../../shared/i18n/en";
import styles from "./CartPage.module.css";

export const CartPage = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.back}>
          <span className={styles.backArrow}>←</span>
          {dictionary.cart.continueShopping}
        </Link>
        <div className={styles.headerRow}>
          <div>
            <p className={styles.eyebrow}>{dictionary.cart.title}</p>
            <h1 className={styles.title}>{dictionary.cart.selection}</h1>
          </div>
          {items.length > 0 && (
            <button type="button" className={styles.clearButton} onClick={clearCart}>
              {dictionary.cart.clearCart}
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState
            title={dictionary.cart.emptyTitle}
            description={dictionary.cart.emptyDesc}
            action={
              <Link to="/" className={styles.primaryLink}>
                {dictionary.cart.browsePhones}
              </Link>
            }
          />
        ) : (
          <div className={styles.layout}>
            <div className={styles.list}>
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.colorCode}-${item.storageCode}`}
                  className={styles.card}
                >
                  <img src={item.product.imageUrl} alt={item.product.model} className={styles.image} />
                  <div className={styles.info}>
                    <div>
                      <p className={styles.brand}>{item.product.brand}</p>
                      <Link to={`/product/${item.product.id}`} className={styles.modelLink}>
                        <h2 className={styles.model}>{item.product.model}</h2>
                      </Link>
                    </div>
                    <div className={styles.meta}>
                      <span>
                        {item.product.options.colors.find((color) => color.code === item.colorCode)?.name ?? dictionary.cart.color}
                      </span>
                      <span>
                        {item.product.options.storages.find((storage) => storage.code === item.storageCode)?.name ?? dictionary.cart.storage}
                      </span>
                    </div>
                    <div className={styles.footer}>
                      <div className={styles.quantityControls} role="group" aria-label="Quantity controls">
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.product.id, item.colorCode, item.storageCode, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className={styles.quantity} aria-live="polite" aria-atomic="true">
                          <span className="visually-hidden">Quantity: </span>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.product.id, item.colorCode, item.storageCode, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeItem(item.product.id, item.colorCode, item.storageCode)}
                      >
                        {dictionary.cart.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className={styles.summary}>
              <p className={styles.summaryTitle}>{dictionary.cart.orderSummary}</p>
              <div className={styles.summaryRow}>
                <span>{dictionary.cart.items}</span>
                <strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>{dictionary.cart.total}</span>
                <strong>
                  {total.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </strong>
              </div>
              <Link to="/" className={styles.primaryLink}>
                {dictionary.cart.continueShopping}
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
