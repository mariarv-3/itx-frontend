import type { CartRepository } from "../domain/CartRepository";
import type { AddToCartApiResponse } from "./CartApiResponse";
import { API_URL } from "../../../shared/config/api";

export class CartApiRepository implements CartRepository {

  async addProduct(
    id: string,
    colorCode: number,
    storageCode: number
  ): Promise<number> {

    const response = await fetch(
      `${API_URL}/api/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          colorCode,
          storageCode,
        }),
      }
    );


    if (!response.ok) {
      throw new Error(
        `Failed to add product to cart (${response.status})`
      );
    }


    const data =
      await response.json() as AddToCartApiResponse;


    return data.count;
  }
}