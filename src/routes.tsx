import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { ProductListPage } from "./features/product/presentation/pages/ProductListPage";
import { ProductDetailsPage } from "./features/product/presentation/pages/ProductDetailsPage";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <ProductListPage />,
        },
        {
            path: "product/:id",
            element: <ProductDetailsPage />,
        },
        ],
    },
]);