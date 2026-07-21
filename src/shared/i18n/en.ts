export const dictionary = {
  header: {
    title: "ITX Store",
    home: "Home",
  },
  cart: {
    title: "Cart",
    selection: "Your selection",
    clearCart: "Clear cart",
    emptyTitle: "Your cart is empty",
    emptyDesc: "Add a device to get started.",
    browsePhones: "Browse phones",
    color: "Color",
    storage: "Storage",
    qty: (quantity: number) => `Qty ${quantity}`,
    remove: "Remove",
    orderSummary: "Order summary",
    items: "Items",
    total: "Total",
    continueShopping: "Continue shopping"
  },
  productList: {
    loading: "Loading products...",
    error: "Error Loading Products",
    noResultsTitle: "No results found",
    noResultsDesc: (query: string) =>
      `We couldn't find any products matching "${query}". Please try another search.`,

    resultsCount: (count: number) =>
      `${count} ${count === 1 ? "product" : "products"}`,

    filteredBy: (query: string) =>
      `Filtered by "${query}"`,

    clearSearch: "Clear search",
  },
  productDetails: {
    back: "Back to all phones",
    addToCart: "Add to cart",
    addedSuccess: "✓ Added to cart",
    errorAddCart: "Could not add product to cart",
    specsTitle: "Specifications",
    colorLabel: "Color",
    storageLabel: "Storage",
    priceUnavailable: "Price unavailable",
    loading: "Loading…",
    errorLoad: "Error Loading Product Details",
    retry: "Try again"
  },
  productItem: {
    priceUnavailable: "Price unavailable"
  },
  searchBar: {
    placeholder: "Search by brand or model..."
  }
};
