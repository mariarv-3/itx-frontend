import { Outlet } from "react-router-dom";
import { CartProvider } from "./features/cart/presentation/CartContext";
import { BreadcrumbProvider } from "./shared/context/BreadcrumbContext";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import { ScrollToTop } from "./shared/components/ScrollToTop";

function App() {
    return (
        <ErrorBoundary>
            <ScrollToTop />
            <BreadcrumbProvider>
                <CartProvider>
                    <main>
                        <Outlet />
                    </main>
                </CartProvider>
            </BreadcrumbProvider>
        </ErrorBoundary>
    );
}

export default App;
