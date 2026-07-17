import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { ProductListPage } from "./features/product/presentation/pages/list/ProductListPage";
import { ProductDetailsPage } from "./features/product/presentation/pages/details/ProductDetailsPage";

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