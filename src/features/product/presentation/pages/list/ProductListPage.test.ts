import type { ProductDetail } from "../../../domain/Product";
import { filterProductsByQuery } from "./ProductListPage";

const createProduct = (brand: string, model: string): ProductDetail => ({
  id: "1",
  brand,
  model,
  price: 999,
  imageUrl: "https://example.com/phone.png",
  networkTechnology: null,
  networkSpeed: null,
  gprs: null,
  edge: null,
  announced: null,
  status: null,
  dimensions: null,
  weight: null,
  sim: null,
  displayType: null,
  displayResolution: null,
  displaySize: null,
  os: null,
  cpu: null,
  chipset: null,
  gpu: null,
  externalMemory: null,
  internalMemory: [],
  ram: null,
  primaryCamera: null,
  secondaryCamera: null,
  battery: null,
  batteryTalkTime: null,
  batteryMusicTime: null,
  wlan: null,
  bluetooth: null,
  gps: null,
  nfc: null,
  radio: null,
  usb: null,
  sensors: null,
  colors: [],
  options: {
    colors: [],
    storages: [],
  },
});

describe("filterProductsByQuery", () => {
  it("matches brand and model terms independently when the query contains multiple words", () => {
    const products = [
      createProduct("Acer", "Liquid E900"),
      createProduct("Samsung", "Galaxy S24"),
    ];

    expect(filterProductsByQuery(products, "acer 900")).toEqual([products[0]]);
  });

  it("matches accented and punctuation variations in a flexible way", () => {
    const products = [createProduct("Apple", "iPhone 14 Pro")];

    expect(filterProductsByQuery(products, "iphone 14 pro")).toEqual([products[0]]);
    expect(filterProductsByQuery(products, "iphone-14-pro")).toEqual([products[0]]);
  });
});
