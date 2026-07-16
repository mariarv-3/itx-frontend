import type { Product } from "../domain/Product";
import type { ProductApiResponse } from "./ProductApiResponse";


export function mapProduct(
  product: ProductApiResponse
): Product {

  return {
    id: product.id,
    brand: product.brand,
    model: product.model,
    price: product.price
      ? Number(product.price)
      : undefined,
    imageUrl: product.imgUrl,
  };
}