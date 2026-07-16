import type { ProductDetail } from "../../product/domain/Product";

export interface CartItem {
  product: ProductDetail;
  colorId: number;
  storage: string;
  quantity: number;
}
