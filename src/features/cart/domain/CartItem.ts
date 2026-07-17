import type { ProductDetail } from "../../product/domain/Product";

export interface CartItem {
  product: ProductDetail;
  colorCode: number;
  storageCode: number;
  quantity: number;
}