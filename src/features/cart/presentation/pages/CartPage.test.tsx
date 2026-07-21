/** @jest-environment jsdom */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartPage } from "./CartPage";
import { CartProvider } from "../CartContext";

jest.mock("../../../../shared/components/Header", () => ({
  Header: () => <div>Header</div>,
}));

describe("CartPage", () => {
  it("shows an empty state when the cart is empty", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});
