import { mapProduct, mapProductDetail } from "../ProductMapper";
import type { ProductApiResponse, ProductDetailApiResponse } from "../ProductApiResponse";

const baseResponse: ProductApiResponse = {
  id: "abc",
  brand: "Apple",
  model: "iPhone 14",
  price: "999",
  imgUrl: "https://example.com/iphone.jpg",
};

describe("mapProduct", () => {
  it("maps all base fields correctly", () => {
    const result = mapProduct(baseResponse);
    expect(result).toEqual({
      id: "abc",
      brand: "Apple",
      model: "iPhone 14",
      price: 999,
      imageUrl: "https://example.com/iphone.jpg",
    });
  });

  it("maps an empty price string to null", () => {
    const result = mapProduct({ ...baseResponse, price: "" });
    expect(result.price).toBeNull();
  });

  it("converts price string to number", () => {
    const result = mapProduct({ ...baseResponse, price: "1299" });
    expect(result.price).toBe(1299);
  });

  it("maps imgUrl to imageUrl (normalises key name)", () => {
    const result = mapProduct({ ...baseResponse, imgUrl: "https://example.com/img.jpg" });
    expect(result.imageUrl).toBe("https://example.com/img.jpg");
  });
});

describe("mapProductDetail", () => {
  const detailResponse: ProductDetailApiResponse = {
    ...baseResponse,
    os: "iOS 16",
    cpu: "A15 Bionic",
    internalMemory: ["128 GB", "256 GB"],
    colors: [1, 2],
    dimentions: "147.5 x 71.5 x 7.8 mm",
  };

  it("maps base fields correctly", () => {
    const result = mapProductDetail(detailResponse);
    expect(result.id).toBe("abc");
    expect(result.brand).toBe("Apple");
    expect(result.model).toBe("iPhone 14");
    expect(result.price).toBe(999);
    expect(result.imageUrl).toBe("https://example.com/iphone.jpg");
  });

  it("maps OS and CPU fields", () => {
    const result = mapProductDetail(detailResponse);
    expect(result.os).toBe("iOS 16");
    expect(result.cpu).toBe("A15 Bionic");
  });

  it("maps internalMemory array", () => {
    const result = mapProductDetail(detailResponse);
    expect(result.internalMemory).toEqual(["128 GB", "256 GB"]);
  });

  it("maps colors array", () => {
    const result = mapProductDetail(detailResponse);
    expect(result.colors).toEqual([1, 2]);
  });

  it("normalises API typo 'dimentions' → 'dimensions'", () => {
    const result = mapProductDetail(detailResponse);
    expect(result.dimensions).toBe("147.5 x 71.5 x 7.8 mm");
  });

  it("defaults missing optional fields to null", () => {
    const result = mapProductDetail(baseResponse);
    expect(result.os).toBeNull();
    expect(result.cpu).toBeNull();
    expect(result.networkTechnology).toBeNull();
  });

  it("defaults missing arrays to empty arrays", () => {
    const result = mapProductDetail(baseResponse);
    expect(result.internalMemory).toEqual([]);
    expect(result.colors).toEqual([]);
  });
});
