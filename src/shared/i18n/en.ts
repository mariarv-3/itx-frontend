export const dictionary = {
  header: {
    title: "ITX Store",
    home: "Home",
  },
  productList: {
    loading: "Loading products...",
    error: "Error Loading Products",
    noResultsTitle: "No results found",
    noResultsDesc: (query: string) => `We couldn't find any products matching "${query}". Please try another search.`,
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
