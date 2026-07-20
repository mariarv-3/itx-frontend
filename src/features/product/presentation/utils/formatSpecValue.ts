import type { ProductDetail } from "../../domain/Product";
import type { SpecKey } from "../constants/productSpecs";

export const formatSpecValue = (value: ProductDetail[SpecKey]): string | null => {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return null;

  return String(value);
};
