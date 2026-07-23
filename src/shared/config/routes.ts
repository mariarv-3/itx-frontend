export const AppRoutes = {
  HOME: "/",
  CART: "cart",
  PRODUCT: (id: string) => `/product/${id}`,
  PRODUCT_ROUTE: "product/:id",
} as const;
