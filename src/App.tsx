import { Outlet } from "react-router-dom";
import { CartProvider } from "./features/cart/presentation/CartContext";
import { BreadcrumbProvider } from "./shared/context/BreadcrumbContext";

function App() {
    return (
        <BreadcrumbProvider>
            <CartProvider>
                <main>
                    <Outlet />
                </main>
            </CartProvider>
        </BreadcrumbProvider>
    );
}

export default App;
