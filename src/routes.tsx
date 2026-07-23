import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { ProductListPage } from "./features/product/presentation/pages/list/ProductListPage";
import { ProductDetailsPage } from "./features/product/presentation/pages/details/ProductDetailsPage";
import { CartPage } from "./features/cart/presentation/pages/CartPage";
import { AppRoutes } from "./shared/config/routes";

export const router = createBrowserRouter([
    {
    path: AppRoutes.HOME,
    element: <App />,
    children: [
        {
            index: true,
            element: <ProductListPage />,
        },
        {
            path: AppRoutes.PRODUCT_ROUTE,
            element: <ProductDetailsPage />,
        },
        {
            path: AppRoutes.CART,
            element: <CartPage />,
        },
        ],
    },
]);